import Profile from "../components/Profile"
import { Admin } from "../class/Admin";
import adminData from '../testAdmin.json'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

let admin = new Admin(adminData.name,adminData.account,adminData.password)
export default function Test(){
    const [newVoters,setVoters] = useState([])
    const [genCount,setGenCount] = useState(1)
    const inputHandler =(e)=>{
        setGenCount(e.target.value);
    }
    return(
        <Container fluid>
            <Row key="1" className="mb-3">
                <Col>
                    <Profile
                        id={admin.id}
                        name={admin.name}
                        account={admin.account}
                        password={admin.password}
                    ></Profile>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                        產生數量
                        </InputGroup.Text>
                        <Form.Control
                        type="number"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        min={1}
                        value={genCount}
                        onChange={inputHandler}
                        />
                        <Button variant="primary" onClick={()=>{
                            let voters = admin.genVoter(genCount);
                            setVoters(()=>voters)
                            console.log(voters)
                        }}>產生</Button>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                        已產生數量
                        </InputGroup.Text>
                        <Form.Control
                        disabled={true}
                        value={newVoters.length}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row key="2" className="mb-3">
                {newVoters.map((voter)=>{
                    return(<Col key={voter.id} sm={4} className="mb-3">
                        <Profile id={voter.id} name={voter.name} account={voter.account} password={voter.password}/>
                    </Col>)
                })}
            </Row>
        
        </Container>
    )
}
