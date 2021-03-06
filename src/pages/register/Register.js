import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { setUserInfo, useAuthDispatch } from '../../context/AuthContext';
import { AuthApi } from '../../api/api-auth';
import Input from './../../components/UI/Input/Input';

const url = "Register"
const Register = () => {
    // variable and states
    const [nationalCode, setNationalCode] = useState();
    const [mobile, setMobile] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [confPassword, setConfPassword] = useState();
    // context state
    const userDispatch = useAuthDispatch()
    // validate
    const validateRegister = (user) => {
        if (!user.nationalCode) return "لطفا کد ملی خود را وارد کنید";
        if (!user.mobile) return "لطفا شماره موبایل خود را وارد کنید";
        if (!user.firstName) return "لطفا نام خود را وارد کنید";
        if (!user.lastName) return "لطفا نام خانوادگی خود را وارد کنید";
        if (!user.password) return "لطفا رمز عبور را وارد کنید";
        if (user.password !== user.confPassword)
            return "تکرار رمز عبور با رمز عبور اصلی متفاوت است";
    };
    // register function
    const handleRegister = () => {
        const infoRegister = {
            nationalCode: nationalCode,
            mobile: mobile,
            firstName: firstName,
            lastName: lastName,
            password: password,
            confPassword: confPassword,
        };
        // handle error
        const error = validateRegister(infoRegister);
        if (error) return console.warn(error);
        // handle Api
        AuthApi(infoRegister, url, (isOK, data) => {
            if (!isOK) return console.log(data);
            console.log(data);
            setUserInfo(userDispatch, data)
        })
    }

    return (
        <Container>
            <h1 className="mt-1 p-3 text-center rounded">صفحه ثبت نام</h1>
            <Row className="mt-5 shadow-lg">
                <Col lg={9} md={8} sm={12} className="p-5 m-auto rounded-lg">
                    <Form dir="rtl" autoComplete="on">
                        <Form.Group className="mb-3" controlId="fromBasicNationalCode">
                            <Form.Label>کد ملی</Form.Label>
                            <Input inputtype="input" type="number" placeholder="کد ملی خود را وارد کنید ..." onChange={(e) => setNationalCode(e.target.value)} />
                            <Form.Text className="text-muted">
                                ما هیچوقت کد ملی شما را با دیگران به اشتراک نمیگداریم!
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fromBasicMobile">
                            <Form.Label>موبایل</Form.Label>
                            <Input inputtype="input" type="tel" placeholder="شماره موبایل خود را وارد کنید ..." onChange={(e) => setMobile(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fromBasicFirstName">
                            <Form.Label>نام</Form.Label>
                            <Input inputtype="input" type="text" placeholder="نام خود را وارد کنید ..." onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fromBasicLastName">
                            <Form.Label>نام خانوادگی</Form.Label>
                            <Input inputtype="input" type="text" placeholder="نام خانوادگی خود را وارد کنید ..." onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>رمز عبور</Form.Label>
                            <Input inputtype="input" type="password" autoComplete="on" placeholder="رمز عبور خود را وارد کنید ..." onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfPassword">
                            <Form.Label>تکرار رمز عبور</Form.Label>
                            <Input inputtype="input" type="password" autoComplete="on" placeholder="بار دیگر رمز عبور خود را وارد کنید ..." onChange={(e) => setConfPassword(e.target.value)} />
                        </Form.Group>
                        <Button className="mt-5" variant="primary" style={{ width: '100%' }} onClick={() => handleRegister()}>
                            ثبت نام
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;