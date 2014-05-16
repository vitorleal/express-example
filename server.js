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

//Faz o parser do body
app.use(bodyParser());


//User
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


//Amigos
app.get('/friends', function (req, res) {
  var friends = [
    { name: 'David',   invited: false, thumb: 'http://lorempixel.com/50/50/sports/' },
    { name: 'Erico',   invited: false, thumb: 'http://lorempixel.com/50/50/sports/1' },
    { name: 'Sheldon', invited: false, thumb: 'http://lorempixel.com/50/50/sports/2' },
    { name: 'João',    invited: false, thumb: 'http://lorempixel.com/50/50/sports/3' },
    { name: 'Fábio',   invited: false, thumb: 'http://lorempixel.com/50/50/sports/4' },
    { name: 'Marcos',  invited: false, thumb: 'http://lorempixel.com/50/50/sports/5' },
    { name: 'David',   invited: false, thumb: 'http://lorempixel.com/50/50/sports/6' },
    { name: 'Erico',   invited: false, thumb: 'http://lorempixel.com/50/50/sports/7' },
    { name: 'Sheldon', invited: false, thumb: 'http://lorempixel.com/50/50/sports/8' },
    { name: 'João',    invited: false, thumb: 'http://lorempixel.com/50/50/sports/9' },
    { name: 'Fábio',   invited: false, thumb: 'http://lorempixel.com/50/50/sports/10' }
  ];

  res.send({ friends: friends });
});

//Login
app.post('/login', function (req, res) {
  if (!req.body) {
    res.send({ login: false });

  } else {
    var email = req.body.email,
        pass  = req.body.pass;

    if (email === 'user@app.com' && pass == '1234') {
      res.send({ login: true });

    } else {
      res.send({ login: false });
    }
  }
});


app.listen(5000);
console.log('Server running at http://127.0.0.1:5000/');
