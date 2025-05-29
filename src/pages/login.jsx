import { useState } from "react";
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
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // 假設帳號為 admin 密碼為 1234
        if (account === "admin" && password === "1234") {
        alert("登入成功！");
        setError("");
        } else {
        setError("帳號或密碼錯誤");
        }
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
