import {User} from './User'


export class Voter extends User{
    vote(candidateId){
        this.vote = candidateId
    }
}