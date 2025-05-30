const User = require('./User');
const Voter = require('./Voter');

const generatePassword = require('../module/generatePassword')
const generateString = require('../module/generateString')
const fs = require('fs');
const { error } = require('console');
class Admin extends User{
    genVoter(count=8){
        let voters = new Array()
        for(let i=1;i<=count;i++){
            let tmpName = generateString(8);
            let tmpPasswd = generatePassword(8);
            let voter = new Voter(tmpName,`voter${i}`,tmpPasswd)
            voters.push(voter)
        }
        return voters
    }
    saveVoter(voters,path="./data/voters.json"){
        try{
            let json = JSON.stringify(voters,null,4);
            fs.writeFileSync(path,json);
            return {state:true,error:""}
        }catch(error){
            return {state:false,error:error}
        }
    }
    saveCandidate(candidates,path="./data/candidates.json"){
        if(candidates.length>0){
            try{
                let json = JSON.stringify(candidates,null,4);
                fs.writeFileSync(path,json);
                return {state:true,error:""}
            }catch(error){
                return {state:false,error:error}
            }
        }else{
            return {state:false,error:"尚未新增候選人"}
        }
    }
}

module.exports = Admin