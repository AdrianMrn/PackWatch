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
        url: 'http://packwatch.test/item',
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
        url: 'http://packwatch.test/item',
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

function createLink(access_token, next) {
    request.post({
        url: 'http://packwatch.test/link',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        form: {
            item_id: 2,
            pack_id: 1
        }
    }, function(error, response, body) {
        next(body);
    });
}

function getPackItems(access_token, next) {
    request({
        url: 'http://packwatch.test/getpackitems?id=1',
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
        url: 'http://packwatch.test/register',
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

        /* getUserId(access_token, function(user_id) {
            console.log(user_id);
        }); */

        getPackItems(access_token, function(response) {
            console.log(response);
        });
        
    });
}

/* start(); */