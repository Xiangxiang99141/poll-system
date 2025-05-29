// 引入 library
const express = require('express');
const Admin = require('./class/Admin');
const fs = require('fs');
const cors = require('cors');
const { executionAsyncResource } = require('async_hooks');

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
        voters:voters
    });
})

app.get('/create/:count',(req,res)=>{
    let count = req.params.count;
    voters = admin.genVoter(count)
    res.json(voters);
})

app.post('/admin/save',(req,res)=>{
    let result = admin.save(req.body);
    if(result.state){
        res.json({success:true});
    }else{
        res.json({success:false,error:result.error});
    }
})

app.post('/login',(req,res)=>{
    const {account,password} = req.body;
    if(voters != null){
        const result = voters.filter((voter)=>voter.account==account && voter.password == password);
        if(result.length>0){
            res.json({
                success:true,
                userId:result[0].id
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


// 運行這個 port，參數分別為 port 和要執行的 function
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})