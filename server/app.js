// 引入 library
const express = require('express');
const Admin = require('./class/Admin');
const fs = require('fs');
const cors = require('cors');
const Candidate = require('./class/Candidate');

// express 引入的是一個 function
const app = express();
// 建立一個不易產生衝突的 port 用來測試
const port = 5001;

app.use(cors());
app.use(express.json());
const adminData = JSON.parse(fs.readFileSync('./data/admin.json','utf-8'));
let admin = new Admin(adminData.name,adminData.account,adminData.password,adminData.id);



const votersPath = './data/voters.json';
const votePath = './data/vote.json';
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
    const voteFile = JSON.parse(fs.readFileSync(votePath,'utf-8'))
    if(voters != null){
        const result = voters.find((voter)=>voter.account==account && voter.password == password);
        const isAdmin = account==admin.account && password == admin.password || false
        let isVote=false;
        let findId = isAdmin?admin.id:result.id
        voteFile.forEach(vote => {
            vote.userId.includes(findId)?isVote=true:isVote=false
        });
        if(isAdmin || result.length>0){
            res.json({
                success:true,
                userId:isAdmin?admin.id:result.id,
                isAdmin:isAdmin,
                isVoted:isVote
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
        tmp = candidates.map((candidate)=>{
            delete candidate.account;
            delete candidate.password
        })
        res.json({success:true,candidates:candidates})
    }else{
        res.json({success:false,candidates:[],error:'沒有候選人資料'})
    }
})

app.post('/vote',(req,res)=>{
    const {cId,userId} = req.body;
    try {
        let voteFile = [];

        // 如果檔案存在就讀取
        if (fs.existsSync(votePath)) {
            const fileContent = fs.readFileSync(votePath, 'utf-8');
            voteFile = JSON.parse(fileContent);
        }

        // 檢查是否已有這個候選人資料
        let candidateVote = voteFile.find(v => v.cId === cId);

        if (candidateVote) {
            // 候選人存在，檢查 userId 是否已經投過票
            if (!candidateVote.userId.includes(userId)) {
                candidateVote.userId.push(userId);
            } else {
                return res.json({ success: false, message: '你已經投過票了' });
            }
        } else {
            // 候選人不存在，新增資料
            voteFile.push({ cId, userId: [userId] });
        }

        // 寫回檔案
        fs.writeFileSync(votePath, JSON.stringify(voteFile, null, 4));

        res.json({ success: true, message: '投票成功' });
    } catch (err) {
        console.error('寫入投票檔案失敗:', err);
        res.status(500).json({ success: false, message: '伺服器錯誤' });
    }
})

// 運行這個 port，參數分別為 port 和要執行的 function
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})