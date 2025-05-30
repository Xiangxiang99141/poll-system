import { useEffect, useState } from "react"
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/welcome.css'
import { Container,Row,Alert, Col, Button} from "react-bootstrap"
import CandidatesProfile from "../components/CandidatesProfile"

export default function Welcome(){
    const [count, setCount] = useState(0)
    const [candidates,setCandidates] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5001/getcandidates')
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.success){
                setCandidates(data.candidates)
            }
        })
        
    },[])
    return(
        <>
            {/* <div id="welcome">
                <div>
                    <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                    </button>
                    <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </div> */}
            <Container>
                {   
                    candidates && candidates.length>0 ?(
                        <Row>

                            {candidates.map((candidate,index)=>{
                                return(
                                    <Col key={index}>
                                        <CandidatesProfile
                                            key={candidate.id}
                                            id={candidate.id}
                                            name={candidate.name}
                                            politics={candidate.politics}
                                            voteCount={candidate.votedCount}
                                        />
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
                    )
                }
            </Container>
        </>
    )
}