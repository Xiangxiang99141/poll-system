import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <Row>
                <Col>
                    <h1 className="display-3 text-warning">404</h1>
                    <h2 className="mb-3">找不到頁面</h2>
                    <p className="mb-4">
                        抱歉，您要查看的頁面不存在或已被移除。
                    </p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        回到首頁
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
