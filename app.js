// variables for required dependencies

const express = require('express');
const data = require('./data.json');
const path = require('path');

// express application
const app = express();

//view engine
app.set('view engine', 'pug');

//static route for static files
app.use('/static', express.static(path.join(__dirname, 'public')));

//set routes
//index route to home page
app.get('/', (req, res) => {
    res.render('index', { projects: data.projects });
});

//route for about page
app.get('/about', (req, res) => {
    res.render('about');
});



//project routes
app.get('/project/:id', (req, res, next) => {
    const projectId = parseInt(req.params.id);
    const project = data.projects.find(p => p.id === projectId);

    if (project) {
        res.render('project', { project });
    } else {
        const err = new Error('project not found');
        err.status = 404;
        next(err);
    }
})

// 404 hander
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    console.log(`404 error occured: ${err.message}`)
    next(err);
})

//other error handlers (not 404)
app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'An error occured';
    console.log(`${err.status} - ${err.message}`);
    res.status(err.status);

    if (err.status === 404) {
        res.render('page-not-found', { err });
    } else {
        res.render('error', { err });
    }
});

//start server
const port = 3000;
app.listen(port, () => {
    console.log(`The application is running on localHost:${port}`);
});
