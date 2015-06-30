//GET /quizes/question
var models = require('../models/models.js');
exports.question = function(req, res){
  models.Quiz.findAll().success(function(quiz){
    res.render('quizes/question',{pregunta : quiz[0].pregunta});
  });
};

//GET /quizes/answer
exports.answer = function(req, res){
  models.Quiz.findAll().success(function(quiz){
    if(req.query.respuesta === quiz[0].respuesta){
      res.render('quizes/answer', {respuesta : 'Correcto'});
    }else{
      res.render('quizes/answer', {respuesta : 'Incorrecto'});
    }
  });
};

//GET /author
exports.author = function(req, res){
  res.render('author',
          {author:'Mauricio Martinez',
            author_img:'images/mauricio.jpg',
            author_video:'video/video.webm'});
};
