var fs = require('fs');
var apiConfig = JSON.parse(fs.readFileSync('./config/apiconfig.json', 'utf8'));

//requestをrequire
var request = require('request');

var twitcas_host = "https://apiv2.twitcasting.tv"

exports.get_oauth_url = function() {
  return twitcas_host + "/oauth2/authorize?client_id=" + apiConfig.twitcas.client_id + "&response_type=code"
};

exports.get_access_token = function(code, redirect_url, callback) {
  //ヘッダーを定義
  var headers = {
    'Content-Type':'application/json;charset=UTF-8'
  }
  var params = {
    "code":code,
    "client_id":apiConfig.twitcas.client_id,
    "client_secret":apiConfig.twitcas.client_secret,
    "grant_type":"authorization_code",
    "redirect_uri":redirect_url,
  }
  var request_parms = {
    url: twitcas_host + "/oauth2/access_token",
    method: 'POST',
    headers: headers,
    json: true,
    form: params
  }
  request(request_parms, function (error, response, body) {
    console.log(body);
    callback(body);
  });
};