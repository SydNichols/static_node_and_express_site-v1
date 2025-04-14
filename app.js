// variables for required dependencies

const express = require('express');
const data = require('./data.json');
const path = require('path');

// express application
const app = express();

//view engine
app.set('view engine', 'pug');

//static route for static files
app.use('static', express.static(path.join(__dirname, 'public')));

//set routes
//index route to home page
app.get('/', (req, res) => {
    res.render('about');
});

//project routes
app.get('/project/:id', (req, res, next) => {
    const projectId = parseInt(req.params.id);
    const project = data.projects.find(p => p.id === projectId);

    if (project) {
        res.render('project', { project });
    }
})

//start server
const port = 3000;
app.listen(port, () => {
    console.log(`The application is running on localHost:${port}`);
});
