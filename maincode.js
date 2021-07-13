//password and username creation -- with encrpytion
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
app.use(express.json())
const users =[]
const posts =[]
const userposts=[]

function gettime(){
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours

    global.hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    global.time=(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}


app.get("/users", (req,res) => {
    res.json(users)

})
app.get("/posts", (req,res) => {
    res.json(posts)

})
app.post("/users", async (req,res) =>{
    try {
        const salt = await bcrypt.genSalt()
        const hashedpassword = await bcrypt.hash(req.body.password, salt)
        const user = {name: req.body.name, password: hashedpassword}
        users.push(user)
        res.send(201).send()
    }catch{
        res.status(500).send()
    }
})

app.post("/users/login", async (req,res) =>{
    const user = users.find(user => user.name === req.body.name)
    if (user==null){
        return res.status(400).send("Invalid Username")
    }
    try{
        if(await bcrypt.compare(req.body.password,user.password)) {
        global.auth = true
        res.send('Welcome '+user.name);
        res.send(post)
        } else{
            res.send('Invalid')
        }
    } catch {
        res.status(500).send()
    }
})
//CREATING THE POSTS
app.post("/posts", async (req,res)=>{
    try{
        gettime()
        const post = {name: req.body.name, post: req.body.post, id: req.body.id, time:time}
        posts.push(post)
        res.send(201).send()
        
    } catch{
        res.status(500).send()
    }
})


//RETRIEVING THE POSTS
app.post("/posts/feed", (req,res)=>{
    // Ensuring that the Name of who can access align
    for (let i=0; i<posts.length; i++){
        if (req.body.name === posts[i].name){
            userposts.push(posts[i].id)
        }
    }
    //sorting them from most recent to oldest
    
    res.send(userposts)    
    })
app.listen(5000)
