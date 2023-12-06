import React from 'react';
import { Col, Row } from 'react-bootstrap';

const PageNotFound = () => {
    return (
        <Row style={{width: '100%', height: 'auto', textAlign: 'center'}}>
            <Col sm={{span: 12}} style={{marginTop: '14%'}}><h1>Сталася помилка, сторінка не знайдена</h1></Col>
            <Col sm={{span: 12}}><h2><a href='/' style={{color: '#010459'}}>Перейти на головну</a></h2></Col>
        </Row>
    );
};

export default PageNotFound;