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
        //console.log(access_token);
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
            name: "maths book",
            color: "green"
        }
    }, function(error, response, body) {
        console.log(error);
        console.log(response);
        console.log(body);
        next();
    });
}

function start() {
    getAccessToken(function(access_token) {
        storeItem(access_token, function(response) {

        })

        /* getUserId(access_token, function(user_id) {
            console.log(user_id);
        }); */
    });
}

start();