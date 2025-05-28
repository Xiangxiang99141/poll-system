import { User } from "./User";
import { Voter } from "./Voter";

import generatePassword from '../js/generatePassword'
import generateString from '../js/generateString'

export class Admin extends User{
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
}