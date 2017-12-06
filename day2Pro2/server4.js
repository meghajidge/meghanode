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
    var db;
   var MongoClient = require('mongodb').MongoClient;
   MongoClient.connect('mongodb://admin:admin@ds153710.mlab.com:53710/meghadb',(err, database)=>{
       if(err)return console.log(err)
       db = database
   })
   var app = express();
   app.use(bp.json());
   var matchedTodo;
   
   var pendingtasks=[]
   app.use(express.static('public'));
   var taskid = 1;
   app.get('/getmypendings',(req,res)=>{
       res.json(pendingtasks);
   })
   
   app.delete('/deletedata',(req,res)=>{
       /* var todoId = parseInt(req.params.id,10);
       var matchedTodo = _.findWhere(pendingtasks,{id:todoId});
       if(!matchedTodo)
       {
           res.status(404).json({"error":"id not found"});
       }else{
           pendingtasks = _.without(pendingtasks,matchedTodo);
           res.json(pendingtasks);
       } */
       db.collection('employdb').findOneAndDelete({name:req.body.name},(err,result)=>{
           if(result){
               res.send('record deleted')
           }else if (result =="0") {
                res.send(500, err)
           }
       }) 
   })
   
   /*app.get('/getmypendings/:id',(req,res)=>{
       var newid = parseInt(req.params.id);
       var matchedTodo=_.findWhere(pendingtasks, {id:newid});
       if(matchedTodo){
           res.json(matchedTodo);
       }else{
           res.status(404).send();
       }
   })
*/
   app.get('/getmydata',(req,res)=>{
       db.collection('employdb').find().toArray((err,result)=>{
           if(err) return console.log(err)
           res.json(result);
       })
   })
   app.put('/updatedata',(req,res)=>{
       db.collection('employdb').findOneAndUpdate(
            {
               taskname:req.body.taskname
            },
            {
                $set: {
                    taskname: req.body.taskname,
                    status: req.body.status
                }
            },
            {
                sort:{_id:-1},
                upsert:true
            },
            (err,result) => {
               if(err) return res.send(err)
               res.send(result)
            }
        )
   });
   app.post('/addmydata',(req,res)=>{
       // var data = req.body;
       // data.id = taskid++;
       //pendingtasks.push(data);
       //res.json(data);
       db.collection('employdb').save(req.body,(err,result)=>{
           if(err)return console.log(err)
           console.log('saved database');
           res.json(req.body);
       })
   })
   app.listen(3000,()=>{
       console.log('Server is started');
   })
}