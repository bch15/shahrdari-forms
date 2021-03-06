import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AuthApi } from './../../api/api-auth';
import Input from './../../components/UI/Input/Input';

const url = "VerifyTwoFactor"
const VerifyTwoFactor = () => {
    // variable and states
    const [code, setCode] = useState();
    // validate
    const validateCode = (user) => {
        if (!user.code) return "لطفا کد پیامک شده را وارد کنید";
    };
    // register function
    const handleCode = () => {
        const infoCode = {
            code: code,
        };
        // handle error
        const error = validateCode(infoCode);
        if (error) return console.warn(error);
        // handle Api
        AuthApi(infoCode, url, (isOK, data) => {
            if (!isOK) return console.log(data);
            console.log(data);
        })
    }
    return (
        <Container >
            <h1 className="mt-5 p-3 text-center rounded">تایید دو مرحله ای</h1>
            <Row className="mt-5 shadow-lg">
                <Col lg={9} md={8} sm={12} className="p-5 m-auto rounded-lg">
                    <Form dir="rtl" autoComplete="on">
                        <Form.Group className="mb-3" controlId="fromBasicNationalCode">
                            <Form.Label>کد</Form.Label>
                            <Input inputtype="input" type="number" placeholder="کد پیامک شده را وارد کنید ..." onChange={(e) => setCode(e.target.value)} />
                            <Form.Text className="text-muted">
                                کد برای شماره موبایل شما پیامک شد
                            </Form.Text>
                        </Form.Group>
                        <Button className="mt-5" variant="warning" style={{ width: '100%' }} onClick={() => handleCode()}>
                            ثبت کد
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default VerifyTwoFactor;