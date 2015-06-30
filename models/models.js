var path = require('path');
//adptacion heroku nube
//Postgres DATABASE_URL = postgres://user:passwd@host:pot/DATABASE_URL
//SQLite DATABASE_URL = sqlite://:@:/
//postgres://qvuhcdegbcbcyd:MMfyzJbjbiF96IUrbXVxsJeEl7@ec2-54-227-249-165.compute-1.amazonaws.com:5432/d74p7v2ppr0trn
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;
//carga modelo ORM
var Sequelize =  require('sequelize');

//Usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
       { dialect:  protocol,

    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);
 var quiz_path = path.join(__dirname,'quiz');
//importar la Definicion
var Quiz = sequelize.import(quiz_path);
exports.Quiz = Quiz;
//sequelize.sync crea e inicializa tabla de preguntas
sequelize.sync().then(function(){
  Quiz.count().then(function (count){
      if(count === 0){//la tabal se incializa si esta vacia
          Quiz.create({
                        pregunta: 'Capital Italia',
                        respuesta: 'Roma'
                      }).then(function(){console.log('Base de datos iniclizada');});
      }
  });
});
