import { useState,useEffect } from 'react';
import Profile from "../components/Profile"
import { 
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row,
    InputGroup 
} from "react-bootstrap";
const env = import.meta.env

export default function User(){
    let token = localStorage.getItem('token')
    const [user,setUser] = useState(null)
    fetch(`${env.VITE_API_SERVER}/getuser`,{
        body:JSON.stringify({
            userId:token,
        }),
        method:"POST",
        headers: {
            // "user-agent": "Mozilla/4.0 MDN Example",
            "content-type": "application/json",
        }
    }).then((res)=>res.json())
    .then((data)=>{
        setUser(data);
    })
    return(
            user && (<Container fluid>
                <Row key="1" className="mb-3">
                    <Col>
                        <Profile
                            id={user.id}
                            name={user.name}
                            account={user.account}
                            password={user.password}
                        />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>)
        )
}