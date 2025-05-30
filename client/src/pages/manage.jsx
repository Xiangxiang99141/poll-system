import NoAccess from "../components/NoAccess";
import Admin from './admin'
import User from "./user";
export default function Manage({isAdmin=false}){
    if(localStorage.getItem('token')==null){
        return(<NoAccess></NoAccess>)
    }
    if(isAdmin){
        return(
            <Admin/>
        )
    }else{
        return(<User/>)
    }
}
