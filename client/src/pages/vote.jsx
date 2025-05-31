import { useState ,useEffect} from "react"
import { Container ,Tab,Tabs,Col,Row,Alert,Button} from "react-bootstrap"
import NoAccess from "../components/NoAccess"
import CandidatesProfile from "../components/CandidatesProfile"
const env = import.meta.env

export default function Vote(){
    const [candidates,setCandidates] = useState([])
    const [isVoted,setIsVoted] = useState(false)
    const [error,setError] = useState('')
    const [info,setInfo] = useState('')
    useEffect(()=>{
        fetch(`${env.VITE_API_SERVER}/getcandidates`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.success){
                setCandidates(data.candidates)
            }
        })
        setIsVoted(localStorage.getItem('isVoted')==='true')
        if (error || info) {
            const timer = setTimeout(() => {
                setError('');
                setInfo('');
            }, 2000);
            return () => clearTimeout(timer); // 清除定時器避免 memory leak
        }
        
        
    },[error,info])

    const token = localStorage.getItem('token');
    if(token != null) {
        return(
            <Container>
                <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                    <Tab eventKey="home" title="候選人列表">
                        {
                            error  && (
                            <Alert key='errorbox' variant='danger'>
                                {error}
                            </Alert>
                            )
                        }
                        {
                            info && (
                            <Alert key='infobox' variant='info'>
                                {info}
                            </Alert>
                            )
                        }
                        
                    {candidates && candidates.length>0 ?(
                        <Row>
                            {candidates.map((candidate,index)=>{
                                return(
                                    <Col key={index}>
                                        <CandidatesProfile
                                            key={candidate.id}
                                            name={candidate.name}
                                            politics={candidate.politics}
                                            voteCount={candidate.votedCount}
                                        />
                                        {
                                            isVoted ? (
                                                <Button variant="secondary" disabled className="mt-2">已投票</Button>
                                            ) : (
                                                <Button variant="primary" className="mt-2" onClick={(e)=>{
                                                    fetch(`${env.VITE_API_SERVER}/vote`,
                                                    {
                                                        body:JSON.stringify({
                                                            cId:candidate.id,
                                                            userId:token
                                                        }),
                                                        method:"POST",
                                                        headers: {
                                                            "content-type": "application/json",
                                                        }
                                                    },)
                                                .then((res)=>res.json())
                                                .then((data)=>{
                                                    if(data.success){
                                                        setIsVoted(true)
                                                        localStorage.setItem('isVoted', true);
                                                        setInfo(data.message)
                                                    }else{
                                                        setError(data.message)
                                                    }
                                                })
                                                }}>投票</Button>
                                            )
                                        }
                                        
                                    </Col>
                                )
                            })}
                        </Row>
                    ):(
                        <Row>
                            <Alert key="candidateInfo" variant='info'>
                                無候選人資料
                            </Alert>
                        </Row>
                    )}
                    </Tab>
                </Tabs>
            </Container>
        )
    }
    else{
        return(<NoAccess/>)
    }

}
