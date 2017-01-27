var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var validator = require('validator');
var conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "jomyjose",
    database: "PurchaseRequest"
});
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var main_router = express.Router();

var js = {
    "status": "",
    "message": ""
};

function callInsertion(postObject) {

    return new Promise(function(resolve, reject) {

        conn.query('INSERT INTO Purchase_Details SET ?', postObject, function(err, result) {
            if (err) {
                reject();
            } else {

                resolve()
            }


        });
    });
}

function findMax() {

    return new Promise(function(resolve, reject) {

        conn.query('SELECT MAX(Purchase_id) as maximum FROM Purchase_Details', function(err, result) {
            if (err) {
                reject();
            } else {

                resolve(result[0].maximum);
            }


        });
    });
}

function insertnewData(item, max) {

    return new Promise(function(resolve, reject) {
        var j = 0;
        for (var i = 0; i < item.length; i++) {
            var get_itemname = item[i].itemname;
            var get_description = item[i].description;
            var get_quantity = item[i].quantity;
            console.log(get_itemname);
            var postObject_items = {
                Purchase_id: max,
                Item_name: get_itemname,
                Item_description: get_description,
                Quantity: get_quantity
            }
            conn.query('INSERT INTO Item_List SET ?', postObject_items, function(err, result) {
                if (err) {
                    reject();
                } else {
                    j++;
                }
                if (j == item.length) {
                    resolve();
                }

            });

        }

    });
}

module.exports.enter_Purchasedata = function(res, data, username) {
    var purchase_title = data.purchase_title_p;
    var assigned_to = data.assigned_to_p;
    var related_project = data.related_project_p;
    var priority = data.priority_p;
    var item_category = data.item_category_p;
    var item = data.items;
    var userName = username;
    var postObject = {
        Purchase_title: purchase_title,
        username: userName,
        Assigned_to: assigned_to,
        Related_project: related_project,
        Priority: priority,
        Category: item_category
    };
    console.log(postObject);
    var js = {
        "status": "",
        "message": ""
    };
    //DATABASE Purchase_Request
    var a;

    callInsertion(postObject)
        .then(function() {

            findMax()
                .then(function(max) {

                    insertnewData(item, max)
                        .then(function() {
                            js.status = 200;
                            js.message = "success";
                            res.send(js);

                        })
                        .catch(function() {
                            js.status = 403;
                            js.message = "failed";
                            res.send(js);
                        });
                });
        });
}

module.exports.callValidation = function(data, username) {

    return new Promise(function(resolve, reject) {
        var purchase_title = data.purchase_title_p;
        var assigned_to = data.assigned_to_p;
        var related_project = data.related_project_p;
        var priority = data.priority_p;
        var item_category = data.item_category_p;
        var item = data.items;
        var userName = username;
        console.log(data.items);

        if (data.items.length < 1) {
            console.log("No Items in the request");
        } else {
            var rejex = /^[a-zA-Z\s]+$/;
            if (rejex.test(validator.trim(data.purchase_title_p))&& validator.trim(data.purchase_title_p).length>4) {
                 console.log("lenth is"+validator.trim(data.purchase_title_p).length);

                for (i = 0; i < data.items.length; i++) {
                    if (validator.isNumeric(validator.trim(data.items[i].quantity))) {
                        if (!validator.isNumeric(validator.trim(data.items[i].description)) &&
                            isNaN(validator.trim(data.items[i].description))) {

                            if (!validator.isNumeric(validator.trim(data.items[i].itemname)) &&
                                isNaN(validator.trim(data.items[i].itemname))) {
                                resolve();
                            } else {
                                console.log("Invalid item name");
                                reject();
                            }
                        } else {
                            console.log("Invalid Description");
                            reject();
                        }
                    } else {
                        console.log("Quantity should be a number");
                        console.log("lenth is"+validator.trim(data.purchase_title_p).length);
                        reject();
                    }
                }

                console.log("items found!!");
            } else {
                console.log("purchase_title is not valid");
            }
        }
    });
}