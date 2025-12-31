const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');  
const methodOverride=require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
let name=[{id:uuidv4(),username:"rohan yadav",content:"Hard work is the key to sucess"},
    {id:uuidv4(),username:"Tonmoy gayen",content:"Focus on your goal"},{id:uuidv4(),username:"Joydip",content:"Sometimes you don’t need love, you need discipline — success comes first."}
];

app.use(express.static(path.join(__dirname, "public")));
app.get('/post', (req, res) => {
    res.render("index.ejs",{name});
});
app.get('/post/new', (req, res) => {
    res.render("new.ejs");
});
app.post('/post',(req,res)=>{
    let{ username, content}=req.body;
    let id=uuidv4(); 
    name.push({id,username,content});
   res.redirect("/post")

});
app.get('/post/:id',(req,res)=>{
let{id}=req.params;
let post=name.find((p)=>p.id===id);
res.render("show.ejs",{post});
});
app.patch('/post/:id',(req,res)=>{
let{id}=req.params;
let ncontent=req.body.content;
let post=name.find((p)=>p.id===id);
post.content=ncontent;
console.log(post);
res.redirect('/post');
});
app.get('/post/:id/edit',(req,res)=>{
let{id}=req.params;
let post = name.find(p => p.id === id);
res.render("edit.ejs",{post});
});
app.delete('/post/:id',(req,res)=>{
let{id}=req.params;
 name= name.filter(p => p.id !== id);
res.redirect('/post');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
