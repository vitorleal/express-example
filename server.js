var express = require('express'),
	  app     = express();

//Index
app.get('/', function(req, res) {
		res.send('Hello world');
});


app.get('/about', function(req, res) {
		res.render('templates/about.html');
});

//User
app.get('/user', function(req, res) {
    var user = {
      name: 'Vitor',
      lastname: 'Leal'
    }
		res.send(user);
});

//User passando o parâmetro
app.get('/user/:name', function(req, res) {
	if (!req.params.name) {
		res.send('Você não me disse seu nome');

	} else {
	  var user = {
      name: req.params.name
    }

		res.send(user);
	}
});

//Login
app.get('/login', function(req, res) {
		res.send('Essa é a pagina de login');
});

//Logout
app.get('/logout', function(req, res) {
		res.redirect('login');
});


app.listen(5000);
console.log('Server running at http://127.0.0.1:5000/');
