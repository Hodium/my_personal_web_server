const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const path = 'public';
const path2 = 'backoffice';
const path3 = 'docs';

const app = express();

app.use('/', express.static(path));
app.use('/backoffice', express.static(path2));

app.use(cors({ origin: '*' }));
jwt.sign({gajo :'nome'},'teste123',(err,token)=>{
  res.json({
    token
  })
})
app.get('/test',verifyToken, function (req, res) {
  jwt.verify(req.token,'teste123',(err,authData)=>{
    if(err)
      res.send("403 - TENHO TOKEN MAS NÃO É ESTE!");
    else{
      res.send("200 - TENHO TOKEN E É ESTE!!");
    }
  })
});

//Verify Token
function verifyToken(req,res,next){
  //Auth header value = > send token into header
  const bearerHeader = req.headers['authorization'];
  //check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){
    //split the space at the bearer
    const bearer = bearerHeader.split(' ');
    //Get token from string
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    //next middleweare
    next();
  }else{
    //Fobidden
    res.send("403 - NÃO TENHO TOKEN");
  }
}

app.get('/anotherTest', function (req, res) {
  res.send("2000!");
});

app.post('/receive', function (request, respond) {
  var body = '';
  filePath = path3 + '/data.txt';
  request.on('data', function (data) {
    body += data;
  });

  request.on('end', function () {
    fs.appendFile(filePath, body, function () {
      respond.send(body).end();
    });
  });
});

// app.delete('/delete', function (request, respond) {
//   filePath = path3 + '/data.txt';
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     respond.end()
//     //file removed
//   })
// })

// set port, listen for requests
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
