const {v7:uuidv7} = require('uuid')
// import {v7 as uuidv7} from 'uuid'

class User{
    constructor(name,account,password,id=uuidv7()){
        this.id = id
        this.name = name;
        this.account = account,
        this.password = password;
    }
    setName(newname){
        this.name = newname;
    }
    setAccount(){

    }
    setPassword(newpasswd){
        this.password = newpasswd;
    }
}
module.exports = User