const express=require('express');
const app=express();
app.use(express.json());
const cors=require('cors');
app.use(cors());
const mongoDB=require('mongodb');
const dotenv=require('dotenv').config()
const MongoClient=new mongoDB.MongoClient(process.env.MONGO);
let usersCollection;
let ideasCollection;
let newsaCollection;


app.get('/',(req,res)=>{
    res.send("Hello welcome to csi ideathon backend");
});

app.get("/ideas",async(req,res)=>{
    try{
        const ideas=await ideasCollection.find().toArray();
        res.json(ideas);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching ideas");
    }
});

app.get("/users",async(req,res)=>{
    try{
        const users=await usersCollection.find().toArray();
        res.json(users);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error fetching users");
    }
});
app.get("/news",(req,res)=>{
    try{
        newsaCollection.find().toArray().then((news)=>{
            res.json(news);
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching news");
    }
});
app.post("/auth",async (req,res)=>{
    const {user}=req.body;
    const newUser=await usersCollection.findOne({email:req.body.user.email})?false:true;
    if (newUser) {
        usersCollection.insertOne({...user,prevIdeas:[],prevVotes:[],votedFor:[],ideaId:""}).then((result)=>{
            res.status(201).json({message:"User created",user:{...user,prevIdeas:[],prevVotes:[],votedFor:[],ideaId:"",_id:result.insertedId}});
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({message:"Error creating user"});
        });
    } else {
        const user=await usersCollection.findOne({email:req.body.user.email});
        res.status(200).json({message:"User already exists",user:user});
    }
});
app.post("/idea",async(req,res)=>{
    const {idea,userId}=req.body;
    try{
        const user=await usersCollection.findOne({_id:new mongoDB.ObjectId(userId)});
                console.log(user)

        if(!user) return res.status(404).json({message:"User not found"});
        if(user.ideaId) return res.status(400).json({message:"User has already submitted an idea"});
        const newIdea={...idea,votes:0,comments:[],author:user.name,authorId:userId};
        const result=await ideasCollection.insertOne(newIdea);
        await usersCollection.updateOne({_id:new mongoDB.ObjectId(userId)},{$set:{ideaId:result.insertedId}});
        res.status(201).json({message:"Idea submitted",idea:{...newIdea,_id:result.insertedId}});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error submitting idea"});
    }
});
app.post("/vote",async(req,res)=>{
    const {ideaId,userId}=req.body;
    try{
        const user=await usersCollection.findOne({_id:new mongoDB.ObjectId(userId)});
        if(!user) return res.status(404).json({message:"User not found"});
        await ideasCollection.updateOne({_id:new mongoDB.ObjectId(ideaId)},{$inc:{votes:1}});
        await usersCollection.updateOne({_id:new mongoDB.ObjectId(userId)},{$push:{votedFor:ideaId}});
        res.status(200).json({message:"Vote recorded",user:{...user,votedFor:[...user.votedFor,ideaId]}});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error recording vote"});
    }
});
app.post("/news",async(req,res)=>{
    const {title,desc,date,img}=req.body;
    try{
        const result=await newsaCollection.insertOne({title,desc
,date,img});
        res.status(201).json({message:"News added",news:{title,desc,date,img,_id:result.insertedId}});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error adding news"});
    }
});
app.listen(5500,()=>{
    MongoClient.connect((err)=>{
        if(err) return console.log(err);
        console.log("Connected to MongoDB");
    }).then(()=>{
        const db=MongoClient.db('csi_ideathon');
        usersCollection=db.collection('users');
        ideasCollection=db.collection('ideas');
        newsaCollection=db.collection('news');
        console.log("Server started on port 5500");
})
});