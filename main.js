const net = require('net');
const fs = require('fs');
const client  = new net.Socket();
const file = 'georgia.json';

const readFile = () => fs.readFile(file, 'utf8',  (err, data) => {
  if (err) throw err;
  data = JSON.parse(data)
  for (let i = 0; i < data.length; i++) {
    setTimeout(() => {
      client.write(`${data[i]}`);
    }, i*60 );
  }
});

client.on('connect',function(){
  console.log('Client: connection established with server');
  readFile()
});

client.connect(31090)