var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout: null });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/fileinfo', upload.single('avatar'), function (req, res) {
  var outPutJson = { filesize: req.file.size };
  res.json(outPutJson);
});

// app.post('/upload', upload.single('avatar'),  function (req, res) {
//   // console.log(req.file.size);
//   var outPutJson = { filesize: req.file.size };
//   res.json(outPutJson);
// });

// custom 404 page
app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-c to terminate.');
});
