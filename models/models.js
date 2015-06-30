var path = require('path');

//carga modelo ORM
var Sequelize =  require('sequelize');

//Usar BBDD SQLite
var sequelize = new Sequelize(null,null,null,
                  {dialect:'sqlite',storage: 'quiz.sqlite'}
    );

//importar la Definicion
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz;
//sequelize.sync crea e inicializa tabla de preguntas
sequelize.sync().success(function(){
  Quiz.count().success(function (count){
      if(count === 0){//la tabal se incializa si esta vacia
          Quiz.create({
                        pregunta: 'Capital Italia',
                        respuesta: 'Roma'
                      }).success(function(){console.log('Base de datos iniclizada');});
      }
  });
});
