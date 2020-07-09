var ProductViewModel = {
    productsData: ko.observableArray([])
};

// API Main URL
var apiMainURI = "http://localhost:4000/";


refershData = () => {
    // get all data and upload product img
    $.getJSON(apiMainURI + "categoryProducts/getAllProducts/all", (data) => {
        data.productsData.forEach(category => {
            category.products.forEach(product => {
                if (product.prodImg != undefined) {
                    // product.prodImg = convertBinaryData2URL(product.prodImg.data);
                    product.prodImg = "http://localhost:4000/images/" + product.prodNo + ".jpg";
                } else
                    product.prodImg = apiMainURI + 'images/noproductimg.jpeg'
            });
        });
        ProductViewModel.productsData(data.productsData);
    });
}




// for first time get all data
refershData();


// Add New category
$('#categoryForm').submit((event) => {
    event.preventDefault();
    var $form = $(this),
        category = $('#category').val(),
        notes = $('#notes').val(),
        category_id = $('#category_id').val(),
        opType = $('#formOprationType').val(),
        url = apiMainURI + 'categoryProducts/';
    url += (opType == 'add') ? 'categoryCreate' : category_id + '/update';
    $.ajax({
        url: url,
        type: (opType == 'add') ? 'POST' : 'PUT',
        dataType: 'json',
        data: { _id: category_id, category: category },
        success: (res, textStatus, xhr) => {
            $('#msg').empty().append(res.msg);
            refershData();
            $('#categoryModal').modal('toggle');
        },
        error: (xhr, textStatus, error) => {
            $('#msg').empty().append('no data saved. Please try agian :( ');
        }
    });
    /*
        var posting = $.post(url, { category: category });
        // when posting funish i need to out the result in massege
        posting.done((res) => {
            if (res.success) {
                $('#msg').empty().append(res.msg);
                refershData();
            } else
                $('#msg').empty().append('no data saved. Please try agian');
        })
        */
});


// Add New product
$('#productForm').submit((event) => {
    event.preventDefault();
    var $form = $(this),
        opType = $('#cp_formOprationType').val(),
        category_id = $('#cp_category_id').val(),
        product_id = $('#cp_product_id').val(),
        productCategory = $('#productCategory').val(),
        prodNo = $('#prodNo').val(),
        prodName = $('#prodName').val(),
        type = $('#type').val(),
        description = $('#description').val(),
        price = $('#price').val(),
        imageFile = $('#imageFile').val(),
        url = apiMainURI + 'categoryProducts/',
        jsonData = { prodNo: prodNo, prodName: prodName, type: type, price: price, description: description };

    url += (opType == 'add') ? 'addProduct/' + productCategory : 'updateProduct/' + productCategory + '/' + prodNo + '/update';

    $.ajax({
        url: url,
        type: 'PUT',
        dataType: 'json',
        data: jsonData,
        success: (res, textStatus, xhr) => {
            $('#prodMsg').empty().append(res.msg);
            // upload image
            let imgForm = new FormData();
            if ($('#imageFile').prop('files').length > 0) {
                let file = $('#imageFile').prop('files')[0];
                imgForm.append('imageFile', file); // imageFile attr as in backend
                let imgURL = apiMainURI + 'categoryProducts/addProductImg/' + productCategory + '/' + prodNo;

                $.ajax({
                    url: imgURL,
                    type: 'PUT',
                    data: imgForm,
                    processData: false,
                    contentType: false,
                    success: (res, textStatus, xhr) => {
                        $('#prodMsg').append('</br>' + res.msg);
                        refershData();
                        $('#productModal').modal('toggle');
                    },
                    error: (xhr, textStatus, error) => {
                        $('#prodMsg').append('image not saved. please try again :( ');
                        $('#prodMsg').append('</br>' + error);
                    }
                }); // end of sending image
            } // end if image exists
        },
        error: (xhr, textStatus, error) => {
            $('#prodMsg').empty().append('no data saved. Please try agian :( ');
            $('#prodMsg').append(error);
        }
    });
});


// set add category function
let setAddCategoryModal = () => {
    $('#categoryModalTitle').empty().append('Add New category');
    $('#formOprationType').val('add');
    $('#category_id').val('');
    $('#category').val('');
}

// set add product function
let setAddProductModal = () => {
    $('#productModalTitle').empty().append('Add New product');
    $('#cp_formOprationType').val('add');
    $('#cp_category_id').val('');
    $('#cp_product_id').val('');
    $('#type').val('New');
    $('#prodNo').val('');
    $('#prodName').val('');
    $('#description').val('');
    $('#price').val('');
};


// edit category function
let setEditCategoryModal = (id, category) => {
    $('#categoryModalTitle').empty().append('Edit category Data');
    $('#formOprationType').val('update');
    $('#category_id').val(id);
    $('#category').val(category);
};


// edit product function
let setEditProductModal = (categoryId, prodId, prodNo, prodName, type, price, description) => {
    $('#cp_formOprationType').val('edit');
    $('#cp_category_id').val(categoryId);
    $('#cp_product_id').val(prodId);
    $('#productCategory').val(categoryId);
    $('#type').val(type);
    $('#prodNo').val(prodNo);
    $('#prodName').val(prodName);
    $('#description').val(description);
    $('#price').val(price);
};





// delete category or product function
let setRemoveModal = (type, id, parentId) => {
    $('#deleteType').val(type);
    $('#deleteId').val(id);
    $('#parentId').val(parentId);
};


// remove category or product
$('#removeEntry').submit((event) => {
    event.preventDefault();
    var id = $('#deleteId').val(),
        parentId = $('#parentId').val(),
        type = $('#deleteType').val(),
        url = apiMainURI;
    if (type == 'category')
        url = url + 'categoryProducts/' + id + '/delete';
    else if (type == 'product')
        url = url + 'categoryProducts/deleteProduct/' + parentId + '/' + id + '/delete';
    $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json',
        data: 'NoDataSent',
        success: (res, textStatus, xhr) => {
            refershData();
            $('#deleteModal').modal('toggle');
        },
        error: (xhr, textStatus, error) => {
            $('#removeMsg').val('No Data Remove. Plaese try agein :( </br>' + error);
        }
    })
});


ko.applyBindings(ProductViewModel);