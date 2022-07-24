const express = require('express')
const app = express()
const port = process.env.PORT || 8081
app.set('json spaces', 4);

const routes = require('./routes/index.route');
app.use(routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
