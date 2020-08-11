import * as React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react';
import {useAllOrderQuery, useCancelOrderQuery, useCreateOrderQuery, useGetOrderInformationQuery} from "./order.queries";

const columns = [
    {
        dataField: '_id',
        text: 'Order ID'
    }, {
        dataField: 'userId',
        text: 'User ID'
    }, {
        dataField: 'details.item',
        text: 'Items'
    },
    {
        dataField: 'status',
        text: 'Status'
    }];

export const OrderList = () => {
    const {data: allOrders, status} = useAllOrderQuery();

    const [item, setItem] = useState('');
    const [createOrder, showCreateOrder] = useState(false);

    // handle 1
    const closeCreateOrderModal = () => showCreateOrder(false);
    const showCreateOrderModal = () => showCreateOrder(true);
    const [createOrderQuery] = useCreateOrderQuery();

    const handleCreateOrderModal = () => {
        createOrderQuery({
            details: {item}
        }).then(r => {
            closeCreateOrderModal();
        });
    };

    const handleChange = (event: any) => {
        setItem(event.target.value)
    };

    // handle 2 - order details
    const [getOrderDetailQuery] = useGetOrderInformationQuery();
    const [orderDetail, setOrderDetail] = useState(false);
    const [order, setOrder] = useState({
        _id: '',
        status: '',
        userId: ''
    });
    const showOrderDetails = (orderId: string) => {
        getOrderDetailQuery(orderId).then((value) => {
            setOrder(value);
            setOrderDetail(true)
        });
    };
    const closeOrderDetails = () => setOrderDetail(false);


    // cancel order
    const [cancelOrderQuery] = useCancelOrderQuery();
    const cancelOrder = () => {
        cancelOrderQuery(order._id).then((value) => {
            closeOrderDetails();
        });
    };

    // handle events
    const tableRowEvents  = {
        onClick: (e: any, row: any, rowIndex: any) => {
            console.log(row);
            showOrderDetails(row._id);
        },
    };

    return (
        <div>
            <Container fluid="md">
                <Row style={{
                    marginTop: '20px'
                }}>
                    <Col>
                        <h2>
                            Order List
                        </h2>
                    </Col>
                </Row>

                <Row>
                    <Col>Mock User Id: mockUserId</Col>
                    <Col>Mock Pin Token: mockPinTokenAndMakeItSecreted</Col>
                </Row>
                <Row style={{
                    marginTop: '20px'
                }}>
                    <Col>
                    <Alert variant='primary'>
                        Click on a row to view order details. An order could be canceled if its status is created or confirmed. After 10s, its status will be delivered. Press F5 to reload if you get some trouble. Thanks!
                    </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button  variant="primary" onClick={showCreateOrderModal}>
                            + Create order
                        </Button>
                    </Col>
                </Row>
                <Row style={{
                    marginTop: '20px'
                }}>
                    <Col>
                        { status === 'success' && (
                            <BootstrapTable keyField='id' data={ allOrders } columns={ columns } rowEvents={tableRowEvents}/>
                        ) }
                    </Col>
                </Row>
            </Container>

            {/*/ Order detail modal /*/}
            <Modal show={orderDetail} onHide={closeOrderDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Order detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container style={{
                        marginTop: '20px'
                    }}>
                        <Row><Col>ID: { order._id }</Col></Row>
                        <Row><Col>UserId: { order.userId }</Col></Row>
                        <Row><Col>Status: { order.status }</Col></Row>
                        <Row style={{
                            marginTop: '10px'
                        }}>
                            <Col>
                                {(order.status === 'CONFIRMED' || order.status === 'CREATED') &&
                                <Button variant="warning"
                                        onClick={ cancelOrder}>
                                    Cancel Order
                                </Button>
                                }
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeOrderDetails}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*// create order modal */}
            <Modal show={createOrder} onHide={closeCreateOrderModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group controlId="formItemName">
                            <Form.Label>Item</Form.Label>
                            <Form.Control type="text" placeholder="Enter item name" value={item}
                                          onChange={handleChange}/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCreateOrderModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ item ? handleCreateOrderModal: undefined}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
