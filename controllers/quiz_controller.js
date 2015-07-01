//GET /quizes/question
var models = require('../models/models.js');

//Autoload factoriza el codigo si la ruta incluye :quizId
exports.load = function(req,res,next,quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
        if(quiz){
          req.quiz = quiz;
          next();
        }else{
          next(new Error('No existe quizId'+quizId));
        }
      }
  );
};

//GET /quiizes/:id
exports.show = function(req, res){
            res.render('quizes/show',{quiz : req.quiz});
  };

//GET /quizes/answer
exports.answer = function(req, res){
    if(req.query.respuesta === req.quiz.respuesta){
      res.render('quizes/answer', {quiz : req.quiz,respuesta : 'Correcto'});
    }else{
      res.render('quizes/answer', {quiz : req.quiz,respuesta : 'Incorrecto'});
    }
};

exports.index = function(req, res){

  if(req.query.search){

    var search = req.query.search;
    
    search = search.replace(/\s{1,}/g, '%');
    search = '%'+search+'%';
    
    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(
      function(quizes){
        res.render('quizes/index.ejs',{quizes:quizes});
      });
    }else{
    models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index.ejs',{quizes:quizes});
    });
  }
};

//GET /author
exports.author = function(req, res){
  res.render('author',
          {author:'Mauricio Martinez',
            author_img:'images/mauricio.jpg',
            author_video:'video/video.webm'});
};
