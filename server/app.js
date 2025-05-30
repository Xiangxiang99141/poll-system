// 引入 library
const express = require('express');
const Admin = require('./class/Admin');
const fs = require('fs');
const cors = require('cors');
const { executionAsyncResource } = require('async_hooks');
const Candidate = require('./class/Candidate');
const { error } = require('console');

// express 引入的是一個 function
const app = express();
// 建立一個不易產生衝突的 port 用來測試
const port = 5001;

app.use(cors());
app.use(express.json());
const adminData = JSON.parse(fs.readFileSync('./data/testAdmin.json','utf-8'));
let admin = new Admin(adminData.name,adminData.account,adminData.password,adminData.id);



let votersPath = './data/voters.json';
// var voters = null;
let voters = fs.existsSync(votersPath)?JSON.parse(fs.readFileSync(votersPath,{encoding:'utf-8'})):null;
let candidatesPath = './data/candidates.json'
let candidates = fs.existsSync(candidatesPath)?JSON.parse(fs.readFileSync(candidatesPath,'utf-8')):[]


// 如何處理不同的 request，參數分別為 url 和要執行的 function
app.get('/', (req, res) => {
    res.send('hello world!')
})

app.get('/bye', (req, res) => {
    res.send('bye!')
})

app.get('/admin',(req,res)=>{
    res.json({
        admin:{"id":admin.id,
        "name":admin.name,
        "account":admin.account,
        "password":admin.password},
        voters:voters,
        candidates:candidates
    });
})

app.get('/create/:count',(req,res)=>{
    let count = req.params.count;
    voters = admin.genVoter(count)
    res.json(voters);
})

app.post('/admin/save/:type',(req,res)=>{
    if(req.params.type === 'v'){
        let result = admin.saveVoter(req.body);
        if(result.state){
            res.json({success:true});
        }else{
            res.json({success:false,error:result.error});
        }
    }
    if(req.params.type === 'c'){
        let result = admin.saveCandidate(req.body);
        if(result.state){
            res.json({success:true});
        }else{
            res.json({success:false,error:result.error});
        }
    }
})

app.post('/login',(req,res)=>{
    const {account,password} = req.body;
    if(voters != null){
        const result = voters.filter((voter)=>voter.account==account && voter.password == password);
        const isAdmin = account==admin.account && password == admin.password || false
        if(result.length>0 || isAdmin){
            res.json({
                success:true,
                userId:isAdmin?admin.id:result[0].id,
                isAdmin:isAdmin
            })
        }else{
            res.json({
                success:false,
                error:'帳號或密碼錯誤',
                account:null
            })
        }
        // console.log(result[0]);
    }else{
        return({
            success:false,
            error:'沒有選民帳號'
        })
    }
})

app.post('/getuser',(req,res)=>{
    const {userId} = req.body;
    const result = voters.filter((voter)=>voter.id==userId);
    res.json(result[0]);
})

app.post('/addcandidate',(req,res)=>{
    const {name,account,password,politics} = req.body;
    let candidates = new Candidate(name,account,password,politics)
    console.log(candidates)
    res.json(candidates)
})

app.get('/getcandidates',(req,res)=>{
    let path = './data/candidates.json'
    if(fs.existsSync(path)){
        let candidates = JSON.parse(fs.readFileSync(path,'utf-8'));
        res.json({success:true,candidates:candidates})
    }else{
        res.json({success:false,candidates:[],error:'沒有候選人資料'})
    }
})

// 運行這個 port，參數分別為 port 和要執行的 function
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})