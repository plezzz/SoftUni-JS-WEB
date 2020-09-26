const fs = require('fs');
const events = require('events');
const server = require('http').createServer();

let eventEmitter = new events.EventEmitter();

eventEmitter.on('click',(a,b,c)=>{
    console.log('A click has been detected!');
    console.log(a + ' ' + b+' '+c); // outputs 'Hello world'

});

eventEmitter.emit('click','Log:', new Date(),'world');
eventEmitter.emit('click','Log: ', new Date(),'Message: test');
eventEmitter.emit('click','Log: ', new Date(),'Message');
eventEmitter.emit('click','Log: ', new Date(),'Message: test2');

server.on('request',(req,res)=>{
    const src = fs.createReadStream('./bigfile.txt');
    src.pipe(res)
});

server.listen(5000);

