const express = require('express');
const Blog = require('../models/blog');
//creating a new instance of router object
const router = express.Router();
router.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt: -1})
     .then((result)=>{
         res.render('index',{title: 'All Blogs', blogs: result})
     })
     .catch((err)=>{
         console.log(err);
     });
})
router.post('/blogs', (req,res)=>{
    //creating a middleware basically takes all the encoded url that comes along and passes it to the object that we can use on request object
    // console.log(req.body);
    //creating an instance of Blog
    const blog = new Blog(req.body);
    blog.save()
     .then(result =>{
         //redirecting to homepage where all the blogs are listed
         res.redirect('/blogs')
     })
     .catch(err =>{
         console.log(err)
     })
})
router.get('/blogs/create', (req,res)=>{
    res.render('create' ,{title: 'Create New Blog'});
})
router.get('/blogs/:id',(req,res)=>{
    //extracting the id for single post
    const id = req.params.id;
    Blog.findById(id)
     .then(result =>{
         res.render('details', {blog: result, title: 'Blog Details'});
     })
     .catch(err =>{
        //  console.log(err);
        //return a 404 page
        res.status(404).render('404', {title: 'Blog not found'});
     });
})
router.delete('/blogs/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result =>{
        res.json({redirect: '/blogs'})
    })
    .catch(err =>{
        console.log(err);
    })
})

module.exports = router;