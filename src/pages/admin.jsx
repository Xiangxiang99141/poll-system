import Profile from "../components/Profile"
import { useState,useEffect } from 'react';
import { 
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row,
    InputGroup,
    Tab,Tabs 
} from "react-bootstrap";
import CandidatesProfile from "../components/CandidatesProfile";


export default function Admin(){
    const [adminData, setAdminData] = useState(null); // ⚠️ 初始為 null
    const [newVoters,setVoters] = useState([])
    const [candidates,setCandidates] = useState([])
    const [genCount,setGenCount] = useState(1)
    const [isSava,setIsSave] = useState(false)
    const [savaError,setSavaError] = useState('')
    const [candidatesName,setCandidatesName] = useState('')
    const [candidatesAccount,setCandidatesAccount] = useState('')
    const [candidatesPassowrd,setCandidatesPassowrd] = useState('')
    const [candidatesPolitics,setCandidatesPolitics] = useState('')
    const inputHandler =(e)=>{
        setGenCount(e.target.value);
    }
    const saveVoterBtnHandler = (e)=>{
        console.log(newVoters);
        fetch('http://localhost:5001/admin/save/v',{
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
    const saveCandiBtnHandler = (e)=>{
        console.log(candidates);
        fetch('http://localhost:5001/admin/save/c',{
            body:JSON.stringify(candidates),
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
    const addCandidateHandler = (e)=>{
        e.preventDefault();
        if(candidatesAccount=='' || candidatesName=='' || candidatesPassowrd=='' || candidatesPolitics==''){
            alert('請輸入全部資訊')
            return
        }
        fetch('http://localhost:5001/addcandidate',
            {
                body:JSON.stringify({
                    name:candidatesName,
                    account:candidatesAccount,
                    password:candidatesPassowrd,
                    politics:candidatesPolitics
                }),
                method:"POST",
                headers: {
                    // "user-agent": "Mozilla/4.0 MDN Example",
                    "content-type": "application/json",
                }
            },)
        .then((res)=>res.json())
        .then((data)=>{
            setCandidates((prev)=>
                [...prev, data]);
            console.log("已新增候選人，目前共", candidates.length + 1, "位"); // 可加 +1 因為 setState 是非同步
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
            
            fetch('http://localhost:5001/getcandidates')
            .then((res)=> res.json())
            .then((data)=>{
                // const a = new Admin(data.name,data.account,data.password);
                // console.log(data);
                setCandidates(data);
                if(data.voters != null){
                    setVoters(data.voters);
                }
                if(data.candidates != null){
                    setCandidates(data.candidates);
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
                                <Col>
                                    <Button onClick={saveVoterBtnHandler}>儲存</Button>
                                </Col>
                                <Col>
                                    <Button onClick={clearBtnHandler}>清除</Button>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Button onClick={saveCandiBtnHandler}>儲存候選人</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    候選人 {candidates.length} 位
                                </Col>
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
            <Row>
                <Tabs
                    defaultActiveKey="votes"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="candidate" title="候選人">
                        {candidates && candidates.length > 0 ? (candidates.map((candidate)=>{
                                return(
                                    <Col key={candidate.id} sm={4} className="mb-3">
                                    <CandidatesProfile 
                                        id={candidate.id}
                                        name={candidate.name}
                                        account={candidate.account}
                                        password={candidate.password}
                                    />
                                </Col>)
                            })):
                                (
                                    <Row>
                                        <Alert key="candidateInfo" variant='info'>
                                            無候選人資料
                                        </Alert>
                                    </Row>
                                )
                            }
                    </Tab>
                    <Tab eventKey="votes" title="選民帳號">
                        <Row>
                            {newVoters.map((voter)=>{
                                return(
                                    <Col key={voter.id} sm={4} className="mb-3">
                                    <Profile id={voter.id} name={voter.name} account={voter.account} password={voter.password}/>
                                </Col>)
                            })}
                        </Row>
                    </Tab>
                    <Tab eventKey="addCandidate" title="新增候選人">
                        <Form onSubmit={addCandidateHandler}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    姓名
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                value={candidatesName}
                                onChange={(e)=>{
                                    setCandidatesName(e.target.value)
                                }}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    帳號
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                value={candidatesAccount}
                                onChange={(e)=>{
                                    setCandidatesAccount(e.target.value)
                                }}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    密碼
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                type="password"
                                value={candidatesPassowrd}
                                onChange={(e)=>{
                                    setCandidatesPassowrd(e.target.value)
                                }}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    政見
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                value={candidatesPolitics}
                                onChange={(e)=>{
                                    setCandidatesPolitics(e.target.value)
                                }}
                                />
                            </InputGroup>
                            <Button variant="primary" className="w-100" type="submit">
                                新增
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Row>
        
        </Container>
    )
}