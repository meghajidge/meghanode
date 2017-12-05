var cluster = require('cluster');

if(cluster.isMaster) {
   var numWorkers = require('os').cpus().length;

   console.log('Master cluster setting up ' + numWorkers + ' workers...');

   for(var i = 0; i < numWorkers; i++) {
       cluster.fork();
   }

   cluster.on('online', function(worker) {
       console.log('Worker ' + worker.process.pid + ' is online');
   });

   cluster.on('exit', function(worker, code, signal) {
       console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
       console.log('Starting a new worker');
       cluster.fork();
   });
} else {
   var express = require('express');
   var bp = require('body-parser');
   var _= require('underscore');
   var app = express();
   app.use(bp.json());
   var matchedTodo;
   
   var pendingtasks=[]
   app.use(express.static('public'));
   var taskid = 1;
   app.get('/getmypendings',(req,res)=>{
       res.json(pendingtasks);
   })
   
   app.delete('/deletemypendings/:id',(req,res)=>{
       var todoId = parseInt(req.params.id,10);
       var matchedTodo = _.findWhere(pendingtasks,{id:todoId});
       if(!matchedTodo)
       {
           res.status(404).json({"error":"id not found"});
       }else{
           pendingtasks = _.without(pendingtasks,matchedTodo);
           res.json(pendingtasks);
       }
   })
   
   app.get('/getmypendings/:id',(req,res)=>{
       var newid = parseInt(req.params.id);
       var matchedTodo=_.findWhere(pendingtasks, {id:newid});
       if(matchedTodo){
           res.json(matchedTodo);
       }else{
           res.status(404).send();
       }
   })
   app.post('/getmypost',(req,res)=>{
       var data = req.body;
       data.id = taskid++;
       pendingtasks.push(data);
       res.json(data);
   })
   app.listen(3000,()=>{
       console.log('Server is started');
   })
   var server = app.listen(3000, function() {
    console.log('Process ' + process.pid + ' is listening to all incoming requests');
});
}