const express = require('express');
//setup mongoose
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');
//express app
const app = express();
const dbURI = 'mongodb+srv://mahamm:test987@node-app.cingy.mongodb.net/node-app?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=>{
     app.listen(3000)
 })
 .catch((err)=>{
     console.log(err)
 })
//register view engine
app.set('view engine', 'ejs');
//listen for request
// app.listen(3000); move to connect method
//Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
//middleware to log details of every request
app.use((req,res, next)=>{
    console.log('new request made:');
    console.log('host:', req.hostname);
    console.log('path:' , req.path);
    console.log('method', req.method);
    next();
});
app.use((req,res, next)=>{
    console.log('in the next middleware');
    next();
});
//mongoose and mongo sandbox routes
// app.get('/add-blog', (req,res)=>{
//     const blog =new Blog({
//         title: 'Minimilast Regime',
//         snippet: 'How to be a minimalist',
//         body: 'more on minimalism'
//     });
//     blog.save()
//      .then((result)=>{
//          res.send(result)
//      })
//      .catch((err)=>{
//          console.log(err);
//      });
// })
// app.get('/all-blogs', (req,res)=>{
//     Blog.find()
//      .then((result)=>{
//          res.send(result)
//      })
//      .catch((err)=>{
//          console.log(err);
//      });
// })
// app.get('/single-blog', (req,res)=>{
//     Blog.findById('5fd314cac01c6c1d249388a6')
//      .then((result)=>{
//          res.send(result)
//      })
//      .catch((err)=>{
//          console.log(err);
//      })
// })
//response to request : routes
app.get('/', (req, res)=>{
    res.redirect('/blogs')
    // const blogs = [
    //     {title:'Simple Living', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
    //     {title:'The Simple Life Course ', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
    //     {title:'The Minimalist Plate ', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
    // ]
    // res.render('index',{title: 'Home', blogs});
})

app.get('/about', (req, res)=>{
    res.render('about' ,{title: 'About'});
})
//blog routes
app.use(blogRoutes);
//404 page
app.use((req, res)=>{
    res.status(404).render('404' ,{title: '404'});
})