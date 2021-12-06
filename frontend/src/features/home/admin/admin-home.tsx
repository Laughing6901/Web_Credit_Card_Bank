import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { decodeToken } from '../../auth/jwtProcess/decode-jwt';
import { selectLoginState } from '../../auth/login/loginSlice';
import { RegisterLayout } from '../../auth/register/RegisterLayout';
import { getAllCard } from '../manage/allCardSlice';
import { getAllLoginHis } from '../manage/loginHistorySlice';
import { getAllPaymentHis } from '../manage/paymentHistorySlice';
import { selectAdminHomeState, setAdminHomeLayout } from './adminSlice';
import { AdminHeader } from './Components/admin-header';
import { AdminLayout } from './Components/admin-layout';

interface  layoutInit{
    Layout: 'loginHis' | 'payment' | 'card' | 'Home' | 'account' | 'createNewAccount',
} 
export const AdminHomeHandleLayout: React.FC<layoutInit> = ({Layout}) => {
    switch (Layout) {
        // case 'account': 
        //     return (
        //     <PaymentLayout />
        //     )
        // case 'card': 
        //     return(<LockCard />)
        // case 'loginHis': 
        //     return(<ChangePassLayout />)
        // case "payment": 
        //     return (<UserHomeLayout />)
        case 'createNewAccount': 
            return(<RegisterLayout />)
        default:
            return (<AdminLayout />)
    }
}


export const AdminHome: React.FC = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectLoginState).token;
    const layout = useAppSelector(selectAdminHomeState).layout;
    const accountId:number = parseInt(decodeToken.getIdFromJwt(token));
    let navigate = useNavigate();
    console.log(accountId);
    
    useEffect(() => {
        dispatch(getAllLoginHis(""));
        dispatch(getAllPaymentHis(""));
        dispatch(getAllCard(""));
        dispatch(setAdminHomeLayout('Home'));
    }, [])
    return (
        <Container fluid className="container-center">
            <Row sm = "3">
            <Col sm="3" xs="12" lg="3"  className = "">
                <AdminHeader accountId = {accountId}  />
            </Col>
            <Col sm = "9" xs ="12" lg = "9" className = "user-home-func-background ">
                <AdminHomeHandleLayout Layout={layout} />
            </Col>
            </Row>
        </Container>
        
    )
}