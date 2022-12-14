var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const cron = require('node-cron');
const fs = require('fs');
const AsyncLock = require('async-lock');
const now = require('./modules/now');

const voteRouter = require('./routes/voteRouter');
const createRouter = require('./routes/createRouter');
const fileLeader = require('./modules/fileLeader');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/apis/vote', voteRouter);
app.use('/apis/', createRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const lock = new AsyncLock({timeout:1000*3});

cron.schedule('0 0 */1 * * *',async ()=>{
  console.log(`${now()}:jsonファイルチェック実行`)
  fs.readdir('./jsons',(err,files) =>{
    files.forEach(file => {
      lock.acquire('dataCheck-lock',async()=>{
        const questionJsonStr = fs.readFileSync(`./jsons/${file}`, 'utf8');
        const questionJson = JSON.parse(questionJsonStr);
        questionData = new Date(questionJson.updateAt);
        nowData = new Date(now());
        let diff =  nowData.getTime() - questionData.getTime();
        const elapsedTime = (diff/(60*60*1000));
        if(elapsedTime > 1){
          fs.unlinkSync(`./jsons/${file}`);
          console.log(`${now()}:${file}を削除しました`)
        }
      },(error,result)=>{
        if(error){
          console.log(error);
        }
      })
    });
  })
});
module.exports = app;
