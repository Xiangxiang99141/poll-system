import { useState } from "react";
import { useNavigate } from "react-router";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Alert
} from "react-bootstrap";
// import users from 'data/'
export default function Login() {
    const navigate = useNavigate();
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/login',{
            body:JSON.stringify({
                account:account,
                password:password
            }),
            method:"POST",
            headers: {
                // "user-agent": "Mozilla/4.0 MDN Example",
                "content-type": "application/json",
            },
        }).then((res)=>res.json())
        .then((data)=>{
            if(data.success){
                setError('');
                localStorage.setItem("token", data.userId);
                navigate('/'); // 導回首頁
            }else{
                setError(data.error);
            }
        })
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center mt-5">
        <Row className="w-100 justify-content-center">
            <Col xs={10} sm={8} md={6} lg={4}>
            <Card>
                <Card.Body>
                <h3 className="text-center mb-4">登入</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formAccount">
                    <Form.Label>帳號</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="輸入帳號"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>密碼</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="輸入密碼"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                    登入
                    </Button>
                </Form>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    );
}
