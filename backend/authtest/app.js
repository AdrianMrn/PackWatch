var request = require('request');

function getAccessToken() {
    request.post({url:'http://packwatch.test/oauth/token', form: {
        grant_type: 'password',
        client_id: '3',
        client_secret: 'EQVN2U2M8QArSvISiX7gYfmKCPcC76ip7cHfyvmK',
        username: 'testuser@gmail.com',
        password: 'testuser',
        scope: '*',
    }}, function(err,httpResponse,body){
        body = JSON.parse(body);
        access_token = body.access_token;
        console.log(access_token);
    });
}

function testAccessToken() {
    var options = {
        url: 'http://packwatch.test/kek',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk4ZWEwYjQ0MjQwZTA0YTA4MTUzNDU0MmQxMjJkMTAxZjI0MDVhMmMwM2I0NDk3ODBmZTUxOTE0NzBiNDFjNGI1ZGVlOGU4YmYwODRhNzM0In0.eyJhdWQiOiIzIiwianRpIjoiOThlYTBiNDQyNDBlMDRhMDgxNTM0NTQyZDEyMmQxMDFmMjQwNWEyYzAzYjQ0OTc4MGZlNTE5MTQ3MGI0MWM0YjVkZWU4ZThiZjA4NGE3MzQiLCJpYXQiOjE1MTQzODA5NDQsIm5iZiI6MTUxNDM4MDk0NCwiZXhwIjoxNTQ1OTE2OTQ0LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.kUmjarfOT-tbRZQ4bfqRKNHF5NIpNdEtAwupbiRJVgkVaf_3EQsmG24q3c5tUvIISTnMexe0yNaclvIQFGerfT6MVJlw2x9ylHeuRey-Srx2s2hWnRe84joGHk77waSDAbBmrX0oI9QK7TDqbU5KtAhAcafAwjInwJEcpQOBalZq2uwgbuaWXnOaO5LVFahHV7qudXwfFUNwyLOMgIdlMb2Zb07YqNEkA-vuM1SQlz7qyuae1TQ9wucEH9a-kGzfhlvzYN1fO4yHaCJ37dYaVzRD09nluCDnEeUGgmRNEEz13TtNdZ8BC4IpBmkXpQA3zgaK_JA6nIGw8qKY8-S8JoFGtEpvZGbAPs4L1wVacBZKfyg0NSHHjXp5DUV8bsa75KjQxu5KuHw_Fx5Rflvj9XVWsOTFKM8RPF8obKMer-oGKI8jUyJPqGHc2b1DRRt311cqBqX4mAjN6T3ZyXGl6YoHyKg525OiJqsm3CUG6cprpVpR1zDIfDQCQZ_tu75O1BFK12pxsXKO6RG0PLb4AwFd7MVbo9uPbz3oZeUkKrK7PRT-JgTbfy4uzoNPMEKg3tWqnjvMnk5lN8JYeB2FI8XvQYjvvnVbMbkDH8Zv5zGS0rT1uMj26hmQaBQQNrCChYS3QR1V1FngsOURaqFv37wnrgnJPopll9Z5v0mNDBA'
        }
    };
    
    request(options, function(error, response, body) {
        console.log(body);
    });
}

testAccessToken();