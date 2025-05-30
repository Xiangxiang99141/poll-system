// const {v7:uuidv7} = require('uuid')
import {v7 as uuidv7} from 'uuid'

export class User{
    constructor(name,account,password){
        this.id = uuidv7()
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