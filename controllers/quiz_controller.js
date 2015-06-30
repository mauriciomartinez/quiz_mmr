//GET /quizes/question
var models = require('../models/models.js');
//GET /quiizes/:id
exports.show = function(req, res){
  models.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show',{quiz : quiz});
  });
};
//GET /quizes/answer
exports.answer = function(req, res){
  models.Quiz.find(req.params.quizId).then(function(quiz){
    if(req.query.respuesta === quiz.respuesta){
      res.render('quizes/answer', {quiz : quiz,respuesta : 'Correcto'});
    }else{
      res.render('quizes/answer', {quiz : quiz,respuesta : 'Incorrecto'});
    }
  });
};

exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
  res.render('quizes/index.ejs',{quizes:quizes});
  });
};

//GET /author
exports.author = function(req, res){
  res.render('author',
          {author:'Mauricio Martinez',
            author_img:'images/mauricio.jpg',
            author_video:'video/video.webm'});
};
