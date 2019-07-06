const http = require('http');

const options = {
  hostname: 'localhost',
  port: 9999,
  path: '/api/market/companies',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  if(res.statusCode != 200){
      process.exit(2);
  }

  res.on('data', d => {
    process.stdout.write(d);
  })
})

req.on('error', error => {
  console.error(error)
})

req.end();