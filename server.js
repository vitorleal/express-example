var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoskin  = require('mongoskin'),
    db         = mongoskin.db('mongodb://vitorleal:1324@ds031948.mongolab.com:31948/cabralia', { safe: true }),
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

//Adiciona o parametro collection em todas as ulr
app.param('collection', function (req, res, next, collection) {
  req.collection = db.collection(collection);
  return next();
});


/*
 *
 *  Páginas HTML
 *
 */
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

/*
 *
 *  API
 *
 */
//Vamos pegar as informações
app.get('/api/:collection', function (req, res, next) {
  //buscamos todas as informações das collections
  req.collection.find({}, { sort: [['_id', -1]] }).toArray(function (erro, results) {
    if (erro) {
      return next(erro);
    }

    //retornamos os resultados
    res.send(results);
  });
});


//Vamos inserir alguma informação na nossa collection
app.post('/api/:collection', function(req, res, next) {
  //pegamos os valores enviados pelo usuário
  var json = req.body;


  //inserimos no banco
  req.collection.insert(json, {}, function (e, results) {
    if (e) {
      return next(e);
    }

    //retornamos o resultado
    res.send(results);
  });
});


//Vamos buscar um item pelo id
app.get('/api/:collection/:id', function (req, res, next) {
  //pagamos o parâmetro id enviado pelo usuário
  var id = req.params.id;

  //buscamos na nossa coléction pelo id enviado
  req.collection.findById(id, function (e, result) {
    if (e) {
      return next(e);
    }

    //retornamos o resultado
    res.send(result);
  });
});

//Vamos atualizar utilizando o id
app.put('/api/:collection/:id', function (req, res, next) {
  //pega a informação enciada pelo usuário
  var json = req.body,
      id   = req.params.id;

  //faz um update buscando pelo id
  req.collection.updateById(id, { $set: json }, { safe: true, multi:false }, function (e, result) {
    if (e) {
      return next(e);
    }

    if (result === 1) {
      res.send({ msg: 'successo' });

    } else {
      res.send({ msg: 'erro' });
    }
  });
});

//Vamos remover um item buscando pelo id
app.delete('/api/:collection/:id', function(req, res, next) {
  //pagamos o parâmetro id enviado pelo usuário
  var id = req.params.id;

  //removemos o item buscando pelo id
  req.collection.removeById(id, function (e, result) {
    if (e) {
      return next(e);
    }

    if (result === 1) {
      res.send({ msg: 'successo' });

    } else {
      res.send({ msg: 'erro' });
    }
  });
});


//Roda o servidor na porta 5000
app.listen(process.env.PORT || 5000);
console.log('Server running at http://127.0.0.1:5000/');
