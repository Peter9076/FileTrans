process.env.TMPDIR = 'tmp'; // to avoid the EXDEV rename error, see http://stackoverflow.com/q/21071303/76173

var express = require('express');
var multipart = require('connect-multiparty');
var Translate=require("./Translate")
var multipartMiddleware = multipart();
var uploader = require('./uploader-node.js')('tmp');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

// Configure access control allow origin header stuff
var ACCESS_CONTROLL_ALLOW_ORIGIN = true;

app.use(bodyParser.json());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'res')));


// Host most stuff in the public folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/tmp'));
app.use(express.static(__dirname + '/res'));
app.use(express.static(__dirname + '/../../dist'));

// Handle uploads through Uploader.js
app.post('/upload', multipartMiddleware, function(req, res) {
  uploader.post(req, function(status, filename, original_filename, identifier) {
    console.log('POST', status, original_filename, identifier);
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "content-type")
    }
    setTimeout(function () {
      res.json({
        status:status,
        identifier:identifier
      });
    }, 500);
  });
});


app.options('/upload', function(req, res){
  console.log('OPTIONS');
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type")
  }
  res.status(200).send();
});

app.options('/translate', function(req, res){
  console.log('OPTIONS');
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type")
  }
  res.status(200).send();
});

app.post('/translate', async function(req, res){
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type")
  }
  const data=req.body;
  const transObj=new Translate();
  const origin=await transObj.uploadTranslate(data.from,data.from,data.format,"./tmp/"+data.identifier,true);
  const result=await transObj.uploadTranslate(data.from,data.to,data.format,"./tmp/"+data.identifier,false);
  res.status(200).json({tid:result.data.tid,ltid:origin.data.tid}).send();
});

app.options('/queryRes', function(req, res){
  console.log('OPTIONS');
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type")
  }
  res.status(200).send();
});

app.post('/queryRes', async function(req, res){
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type")
  }
  const data=req.body;
  const transObj=new Translate();
  const result=await transObj.queryRes(data.tid);
  res.status(200).json({...result}).send();
});

app.options('/download', function(req, res){
  console.log('OPTIONS');
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type")
  }
  res.status(200).send();
});

app.post('/download', async function(req, res){
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type")
  }
  const data=req.body;
  const transObj=new Translate();
  const fileName=await transObj.download(data.tid);
  res.status(200).json({url:fileName}).send();
});

// Handle status checks on chunks through Uploader.js
app.get('/upload', function(req, res) {
  uploader.get(req, function(status, filename, original_filename, identifier) {
    console.log('GET', status);
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header("Access-Control-Allow-Origin", "*");
    }

    res.status(status == 'found' ? 200 : 204).send(status);
  });
});


app.get('/downloadFile/:identifier', function(req, res) {
  res.download("./res/"+req.params.identifier)
});

app.get('/download/:identifier', function(req, res) {
  uploader.write(req.params.identifier, res);
});

app.listen(3000);
