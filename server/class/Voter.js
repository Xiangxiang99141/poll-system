const User = require('./User');


class Voter extends User{
    vote(candidateId){
        this.vote = candidateId
    }
}
module.exports =  Voter;