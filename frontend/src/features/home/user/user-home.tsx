import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { Button, Col, Container, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ChangePassLayout from '../../auth/forgot-pass/changePassLayout';
import { decodeToken } from '../../auth/jwtProcess/decode-jwt';
import { selectLoginState } from '../../auth/login/loginSlice';
import { LockCard } from '../../card/lock-card';
import { Layout } from '../../Layout';
import { ExternalPayment, InternalPayment, TransferSuccessFrom } from '../../payment/components';
import { PaymentLayout } from '../../payment/paymentLayout';
import { setPaymentLayout } from '../../payment/paymentLayoutSlice';
import { getCardInfo } from './cardInfoSlice';
import { Header } from './Components/Header';
import { UserHomeLayout } from './Components/user-home-layout';
import { getAccountInfo, selectUserHomeState, setUserHomeLayout } from './userSlice';
interface  layoutInit{
    layout: 'payment' | 'lockCard' | 'changePass' | 'Home' ;
} 
export const UserHomeHandleLayout: React.FC<layoutInit> = ({layout}) => {
    switch (layout) {
        case "payment": 
            return (
            <PaymentLayout />
            )
        case "lockCard": 
            return(<LockCard />)
        case "changePass": 
            return(<ChangePassLayout />)
        case "Home": 
            return (<UserHomeLayout />)
        default:
            return (<UserHomeLayout />)
    }
}

export const UserHome: React.FC = () => {
    const layout = useAppSelector(selectUserHomeState).layout;
    const token = useAppSelector(selectLoginState).token;
    const accountId:number = parseInt(decodeToken.getIdFromJwt(token));
    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAccountInfo(accountId));
        dispatch(getCardInfo(accountId));
        dispatch(setUserHomeLayout("Home"));
    }, [])

    return (
        <Container fluid className="container-center">
            <Row sm = "3">
            <Col sm="3" xs="12" lg="3"  className = "">
                <Header />
            </Col>
            <Col sm = "9" xs ="12" lg = "9" className = "user-home-func-background">
                <UserHomeHandleLayout layout = {layout}/>
            </Col>
            </Row>
        </Container>
    )
}