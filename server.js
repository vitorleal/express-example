var express    = require('express'),
    bodyParser = require('body-parser')
	  app        = express();


//Adiciona header que permite requests de outros dominios
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};
app.use(allowCrossDomain);

//Faz o parser do body para receber parâmetros dos POSTs
app.use(bodyParser());

//Adiciona a pasta public como local dos arquivos estáticos (html, css, js imagens ...)
app.use(express.static('public'));


//Carrega a url principal e envia um arquivo html
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});


/*
 *
 *  API
 *
 */

//Envia em formato JSON os dados de um usuário
app.get('/user', function (req, res) {
  var user = {
	    name   : 'Vitor Leal',
	    address: 'Rua Lorem Ipsum Dolor 902',
	    job    : 'Analista de Sistemas Senior',
	    age    : '28',
	    thumb  : 'http://lorempixel.com/120/120/sports/'
  };

	res.send(user);
});


//Envia um array com uma lista de amigos em formato JSON
app.get('/friends', function (req, res) {
  var friends = [
    { name: 'David',   thumb: 'http://lorempixel.com/50/50/sports/' },
    { name: 'Erico',   thumb: 'http://lorempixel.com/50/50/sports/1' },
    { name: 'Sheldon', thumb: 'http://lorempixel.com/50/50/sports/2' },
    { name: 'João',    thumb: 'http://lorempixel.com/50/50/sports/3' },
    { name: 'Fábio',   thumb: 'http://lorempixel.com/50/50/sports/4' },
    { name: 'Marcos',  thumb: 'http://lorempixel.com/50/50/sports/5' }
  ];

  res.send({ friends: friends });
});


//Ao receber um POST verifica se o usuário enviou os dados corretos
app.post('/login', function (req, res) {
  if (!req.body) {
    res.send({ login: false });

  } else {
    var email = req.body.email,
        pass  = req.body.pass;

    //Verifica se o email e a senha estão corretos
    if (email === 'user@app.com' && pass == '1234') {
      res.send({ login: true });

    //Se não redireciona o usuário
    } else {
      res.send({ login: false });
    }
  }
});


//Roda o servidor na porta 5000
app.listen(5000);
console.log('Server running at http://127.0.0.1:5000/');
