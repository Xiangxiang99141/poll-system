import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NoAccess() {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <Row>
                <Col>
                    <h1 className="display-3 text-danger">403</h1>
                    <h2 className="mb-3">沒有訪問權限</h2>
                    <p className="mb-4">
                        您沒有權限瀏覽此頁面，請確認您已登入並擁有適當權限。
                    </p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        回到首頁
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
