var request = require('request');

function getAccessToken(next) {
    request.post({url:'http://packwatch.test/oauth/token', form: {
        grant_type: 'password',
        client_id: '2',
        client_secret: 'c9kD5cj7Awkob7K2Dl9hqtP7ze2oAkOvqrpdfSOd',
        username: 'testuser@gmail.com',
        password: 'testuser',
        scope: '*',
    }}, function(err,httpResponse,body){
        body = JSON.parse(body);
        access_token = body.access_token;
        next(access_token);
    });
}

function getUserId(access_token, next) {
    request({
        url: 'http://packwatch.test/api/item',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    }, function(error, response, body) {
        next(body);
    });
}

function storeItem(access_token, next) {
    request.post({
        url: 'http://packwatch.test/api/item',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        form: {
            name: "yummy",
            color: "red"
        }
    }, function(error, response, body) {
        next(body);
    });
}

function updateItem(access_token, next) {
    request.put({
        url: 'http://packwatch.test/api/item/2',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        form: {
            name: "new name",
            color: "new color"
        }
    }, function(error, response, body) {
        next(body);
    });
}

function deleteItem(access_token, next) {
    request.delete({
        url: 'http://packwatch.test/api/item/3',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    }, function(error, response, body) {
        next(body);
    });
}

function createLink(access_token, next) {
    request.post({
        url: 'http://packwatch.test/api/link',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        form: {
            item_id: 3,
            pack_id: 1
        }
    }, function(error, response, body) {
        next(body);
    });
}

function deleteLink(access_token, next) {
    request.delete({
        url: 'http://packwatch.test/api/link/0',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        form: {
            item_id: 3,
            pack_id: 1
        }
    }, function(error, response, body) {
        next(body);
    });
}

function getPackItems(access_token, next) {
    request({
        url: 'http://packwatch.test/api/getpackitems?id=1',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    }, function(error, response, body) {
        console.log(body);
    });
}

function registerUser() {
    request.post({
        url: 'http://packwatch.test/api/register',
        form: {
            name: "kekkertop",
            email: "kekkertop@hotmail.com",
            password: "kekkertop"
        }
    }, function(error, response, body) {
        console.log(body);
    });
}
/* registerUser(); */

function start() {
    getAccessToken(function(access_token) {
        /* storeItem(access_token, function(response) {
            console.log(response);
        }); */

        /* createLink(access_token, function(response) {
            console.log(response);
        }); */

        /* deleteLink(access_token, function(response) {
            console.log(response);
        }); */

        /* getUserId(access_token, function(user_id) {
            console.log(user_id);
        }); */

        /* getPackItems(access_token, function(response) {
            console.log(response);
        }); */

        /* updateItem(access_token, function(response) {
            console.log(response);
        }); */

        deleteItem(access_token, function(response) {
            console.log(response);
        });
        
    });
}

start();