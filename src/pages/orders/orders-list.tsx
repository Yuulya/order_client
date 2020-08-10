import * as React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import {useAllOrderQuery, useCancelOrderQuery, useCreateOrderQuery, useGetOrderInformationQuery} from "./order.queries";

const columns = [{

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

    const [item, setItem] = useState('Test value');
    const [createOrder, showCreateOrder] = useState(false);

    // handle 1
    const closeCreateOrderModal = () => showCreateOrder(false);
    const showCreateOrderModal = () => showCreateOrder(true);
    const [createOrderQuery] = useCreateOrderQuery();

    const handleCreateOrderModal = () => {
        createOrderQuery({
            details: {item}
        });

        closeCreateOrderModal();
    };

    const handleChange = (event: any) => {
        setItem(event.target.value)
    };

    // handle 2 - order details
    const [getOrderDetailQuery] = useGetOrderInformationQuery();
    const [orderDetail, setOrderDetail] = useState(false);
    const [order, setOrder] = useState({
        _id: '',
        status: ''
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
           /* setOrder(value);
            setOrderDetail(true)*/
            closeOrderDetails();
        });
    };

    // handle events
    const tableRowEvents  = {
        onClick: (e: any, row: any, rowIndex: any) => {
            console.log(`clicked on row with index: ${rowIndex}`);
            // showCreateOrder(true);
            console.log(row)
            showOrderDetails(row._id);
        },
    };

    return (
        <div>

            <Button variant="primary" onClick={showCreateOrderModal}>
                Create order
            </Button>

            { status === 'success' && (
                <BootstrapTable keyField='id' data={ allOrders } columns={ columns } rowEvents={tableRowEvents}/>
            ) }


            <Modal show={orderDetail} onHide={closeOrderDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Order detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {order._id}
                    {(order.status === 'CONFIRMED' || order.status === 'CREATED') &&
                        <Button variant="warning"
                                onClick={ cancelOrder}>
                            Cancel Order
                        </Button>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeOrderDetails}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={createOrder} onHide={closeCreateOrderModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group controlId="formItemName">
                            <Form.Label>Item name</Form.Label>
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
