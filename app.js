const express = require('express');
const cors = require('cors');
const fs = require('fs');

const path = 'public';
const path2 = 'backoffice';
const path3 = 'docs';

const app = express();

app.use('/', express.static(path));
app.use('/backoffice', express.static(path2));

app.use(cors({ origin: '*' }));

// app.get('/test', function (req, res) {
//   res.send("1000!");
// });
//
// app.get('/anotherTest', function (req, res) {
//   res.send("2000!");
// });

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
