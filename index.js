const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

// app.get('/', (req, res, next) => {
//     res.send('hello from the server side')
// });

app.use('/', (req, res, next) => {
    console.log(req.url)
    next();
})

app.use(express.static(path.join (__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.post('/contact-form', (req, res) => {
    fs.writeFile(path.join (__dirname, './formsubmissions.json'), req.body.name);
    res.send('thanks')
})

app.get('/formsubmissions', (req, res, next) => {
    fs.readFile('./formsubmissions.json', (err, data) => {
    console.log(data)
    res.send('here u go ' + data)
    });
});


app.listen(3000, () => console.log('listening to port 3000'))