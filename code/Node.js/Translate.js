const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const FormData = require('form-data');
const querystring = require('querystring');

class Translate {
    constructor() {
      this.appid = '1718532479319';
      this.seckey = '683600f147f2afff51607f8fc7426a119a67915e';
    }

  generateRandomString() {
    return crypto.randomBytes(16).toString('hex').slice(0, 16);
  }

  calculateStringMD5(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex').toUpperCase();
  }
  

  async calculateFileMD5(filePath) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('md5');
      const stream = fs.createReadStream(filePath);
  
      stream.on('data', (chunk) => {
        hash.update(chunk);
      });
  
      stream.on('end', () => {
        const md5 = hash.digest('hex');
        resolve(md5);
      });
  
      stream.on('error', (err) => {
        reject(err);
      });
    });
  }

   async uploadTranslate(from, to,format,filePath,edit){
    const form = new FormData();
    // 添加文件参数
    const renamePath=(filePath).toString().substring(0,(filePath).toString().indexOf(".1"))+"."+format;
    if(edit){
      fs.renameSync(filePath,renamePath)
    }
    form.append('file', fs.createReadStream(renamePath));
    const url="/TranslateApi/api/uploadTranslate";
    const md5= await this.calculateFileMD5(renamePath);
    const nonce_str=this.generateRandomString();
    const token=this.calculateStringMD5("appid="+this.appid+"&bilingualControl=0&from="+from+"&md5="+md5+"&nonce_str="+nonce_str+"&privatekey="+this.seckey+"&to="+to);
    form.append("appid",this.appid);
    form.append("from",from);
    form.append("to",to);
    form.append("nonce_str",nonce_str);
    form.append("md5",md5);
    form.append("bilingualControl",0);
    form.append("token",token);
    return new Promise((resolve, reject) => {
      try {
        var options = {
             hostname: 'www.fanyigou.com',
             port: 443,
             path: url,
             method: 'POST',
             headers: {...form.getHeaders()}
         };
         var req = https.request(options, function(res) {
                 console.log('Status: ' + res.statusCode);
                 console.log('Headers: ' + JSON.stringify(res.headers));
                 res.setEncoding('utf8');
                 let responseBody = ''; // 用于存储响应数据
                 res.on('data', function (body) {
                     console.log('Body: ' + body);
                     responseBody+=body;
                 });
                 res.on('end', function() {
                     resolve(JSON.parse(responseBody)); // 在请求结束时，解析 Promise 并返回响应数据
                 });
         });
         req.on('error', function(e) {
                 console.log('problem with request: ' + e.message);
         });
   
         form.pipe(req);
         form.on('end', () => {
          req.end();
        });   
      } catch (error) {
        console.error(error);
      }
     }); 
  }

  async queryRes(tid){
    const url="/TranslateApi/api/queryTransProgress";
    const nonce_str=this.generateRandomString();
    const token=this.calculateStringMD5("appid="+this.appid+"&nonce_str="+nonce_str+"&privatekey="+this.seckey+"&tid="+tid);
    const postData = querystring.stringify({
      'appid': this.appid,
      'nonce_str':nonce_str,
      'token': token,
      'tid':tid
    });
    return new Promise((resolve, reject) => {
      try {
        var options = {
             hostname: 'www.fanyigou.com',
             port: 443,
             path: url,
             method: 'POST',
             headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
             'Content-Length': Buffer.byteLength(postData)
            }
         };
         var req = https.request(options, function(res) {
                 console.log('Status: ' + res.statusCode);
                 console.log('Headers: ' + JSON.stringify(res.headers));
                 res.setEncoding('utf8');
                 let responseBody = ''; // 用于存储响应数据
                 res.on('data', function (body) {
                     console.log('Body: ' + body);
                     responseBody+=body;
                 });
                 res.on('end', function() {
                     resolve(JSON.parse(responseBody)); // 在请求结束时，解析 Promise 并返回响应数据
                 });
         });
         req.on('error', function(e) {
                 console.log('problem with request: ' + e.message);
         });
        
        req.write(postData);
        req.end();
      } catch (error) {
        console.error(error);
      }
     });  
  }

  async download(tid){
    const fileName=crypto.randomBytes(8).toString('hex').slice(0, 8);
    const url="/TranslateApi/api/downloadFile";
    const nonce_str=this.generateRandomString();
    const dtype=2;
    const token=this.calculateStringMD5("appid="+this.appid+"&dtype="+dtype+"&nonce_str="+nonce_str+"&privatekey="+this.seckey+"&tid="+tid);
    console.log(token);
    const postData = querystring.stringify({
      'appid': this.appid,
      'nonce_str':nonce_str,
      'token': token,
      'dtype':2,
      'tid':tid
    });
    return new Promise((resolve, reject) => {
      try {
        var options = {
             hostname: 'www.fanyigou.com',
             port: 443,
             path: url,
             method: 'POST',
             headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
             'Content-Length': Buffer.byteLength(postData)
            }
         };
         var req = https.request(options, function(res) {
                 console.log('Status: ' + res.statusCode);
                 console.log('Headers: ' + JSON.stringify(res.headers));
                 // 创建写入流
                  const filePath ='./res/'+fileName+res.headers['doc-suffix'];
                  const fileStream = fs.createWriteStream(filePath);

                  // 管道连接：将响应流管道连接到文件写入流
                  res.pipe(fileStream);

                  // 监听写入流结束事件
                  fileStream.on('finish', () => {
                    resolve(fileName+res.headers["doc-suffix"])
                    fileStream.close(resolve);
                    console.log('File downloaded and saved successfully.');
                  });

                  // 监听写入流错误事件
                  fileStream.on('error', (err) => {
                    console.error('Error writing file:', err);
                  });
         });
         req.on('error', function(e) {
                 console.log('problem with request: ' + e.message);
         });
        
        req.write(postData);
        req.end();
      } catch (error) {
        console.error(error);
      }
     });  
  }
  }

// (async()=>{
//   await new Translate().download(59802197);
// })()

module.exports=Translate



  
