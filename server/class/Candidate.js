const  User  = require("./User")
const fs = require('fs')
const {v7:uuidv7} = require('uuid')
class Candidate extends User{
    constructor(name,account,password,politics,id=uuidv7(),picture=null){
        super(name,account,password,id)
        this.politics = politics
        this.picture = picture
    }
    setPolitics(){

    }
    setPicture(){
        
    }
}

module.exports = Candidate