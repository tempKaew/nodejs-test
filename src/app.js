const express = require('express')
const app = express()
const port = process.env.PORT || 8081
app.set('json spaces', 4);

const routes = require('./routes/index.route');
app.use(routes)

const path = require('path');
const fs = require("fs");
app.use('/assets/img/microservice.png', (req, res) => {
  var img = fs.readFileSync(path.join(process.cwd()+'/src/assets/img/microservice.png'));
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
