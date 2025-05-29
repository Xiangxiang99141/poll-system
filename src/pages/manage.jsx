import Profile from "../components/Profile"
import NoAccess from "../components/NoAccess";
import { Admin } from "../class/Admin";
import { useState,useEffect } from 'react';
import { 
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row,
    InputGroup 
} from "react-bootstrap";
export default function Manage(){
    if(localStorage.getItem('token')==null){
        return(<NoAccess></NoAccess>)
    }
    const [adminData, setAdminData] = useState(null); // ⚠️ 初始為 null
    const [newVoters,setVoters] = useState([])
    const [genCount,setGenCount] = useState(1)
    const [isSava,setIsSave] = useState(false)
    const [savaError,setSavaError] = useState('')
    const inputHandler =(e)=>{
        setGenCount(e.target.value);
    }
    const saveBtnHandler = (e)=>{
        console.log(newVoters);
        fetch('http://localhost:5001/admin/save',{
            body:JSON.stringify(newVoters),
            method:"POST",
            headers: {
                // "user-agent": "Mozilla/4.0 MDN Example",
                "content-type": "application/json",
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.success){
                setIsSave(true);
            }else{
                setSavaError(data.error);
            }
        });
    }
    const genVotervBtnHandler = (e)=>{
        fetch(`http://localhost:5001/create/${genCount}`)
        .then((res)=>res.json())
        .then((data)=>{
            setVoters(data);
        })
    }
    const clearBtnHandler = (e)=>{
        setVoters([]);
    }

    useEffect(()=>{     
        fetch('http://localhost:5001/admin')
            .then((res)=> res.json())
            .then((data)=>{
                // const a = new Admin(data.name,data.account,data.password);
                // console.log(data);
                setAdminData({
                    "id":data.admin.id,
                    "name":data.admin.name,
                    "account":data.admin.account,
                    "password":data.admin.password
                });
                if(data.voters != null){
                    setVoters(data.voters);
                }
            })
            .catch((err) => console.error("無法取得 admin 資料", err));
    },[]);//deps [] 只運行一次
    return(
        <Container fluid>
            <Row key="1" className="mb-3">
                <Col>
                {
                    adminData && (
                        <Profile
                            id={adminData.id}
                            name={adminData.name}
                            account={adminData.account}
                            password={adminData.password}
                        />
                    )
                }
                    
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
                        <Button variant="primary" onClick={genVotervBtnHandler}>產生</Button>
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
                    <Row>
                        <Col>
                            <Row className="mb-3">
                                <Button onClick={saveBtnHandler}>儲存</Button>
                            </Row>
                            <Row>
                                <Button onClick={clearBtnHandler}>清除</Button>
                            </Row>
                        </Col>
                        <Col>
                            {
                                isSava && (
                                    <Alert key="SaveInfo" variant="info">
                                        儲存成功
                                    </Alert>
                                )
                                
                            }
                            {
                                savaError && <Alert key="SaveError" variant="danger">
                                        儲存失敗<br></br>
                                        {savaError}
                                    </Alert>
                            }
                        </Col>
                    </Row>
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
