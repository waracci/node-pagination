//create routes and a html page to get the data and store it in our db
var router = require("express").Router();
var faker = require("faker");
var Product = require("../models/product");

router.get('/', function(req, res, next){
    res.render('index')
});
router.get('/add-product', function(req, res){
    res.render('main/add-product');
})

router.post('/add-product', function(req, res, next){
    var product = new Product();

    product.category = req.body.category_name;
    product.name     = req.body.product_name;
    product.price    = req.body.product_price;
    product.cover    = faker.image.image();
    
    product.save(function(err){
        if(err)throw err;
        res.redirect('/add-product');
    })
});

//adding dummy data quickly with faker
router.get('/generate-fake-data', function(req, res, next){
    for (var index = 0; index < 99; index++) {
        var product = new Product();
        product.category = faker.commerce.department();
        product.name     = faker.commerce.productName();
        product.price    = faker.commerce.price();
        product.cover    = faker.image.image();

        product.save(function(err){
            if(err)throw err;
        });
    }
    res.redirect('/add-product');
});

//create a new route to render paginated items
router.get('/products/:page', function(req, res){
    var perPage = 10; //contains the max number of items on each page
    var page = parseInt(req.params.page) || 1; //contains the current page number
    Product
    .find({})  //finds all the documents in the Product collection
    .skip((perPage * page) - perPage) //values to be skipped
    .limit(perPage) //output limit per call
    .exec(function(err, products){
        Product.count().exec(function(err, count){ //calculate number of pages
            if(err) return next(err);
            res.render('main/products', {
                products: products,
                current: page,
                pages: Math.ceil(count/perPage)
            })
        })
    })
})

module.exports = router;