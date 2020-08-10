import {Order} from "../common/types";
import {orderHostname} from "../common/config";

const products = [{
    id: '1231',
    name: 'Test',
    price: '5.00'
}];

const orderApiPath = `${orderHostname}/api/orders`;

// export async function getListOrders(): Promise<any> {
/*    const response = await fetch(`${orderApiPath}/orders`, {method: 'GET'});
    const json = await response.json();
    return json;
}*/

export const getListOrders = async (): Promise<any> => {
    const response = await fetch(`${orderApiPath}/orders`, {method: 'GET'});
    const json = await response.json();
    return json;
}

export async function getOrderDetails(orderId: string): Promise<any> {
    const response = await fetch(`${orderApiPath}/orders/${orderId}`, {method: 'GET'});
    const json = await response.json();
    return json;
}

export async function createOrder(data: any): Promise<any> {
    console.log(data)
    const response = await fetch(`${orderApiPath}/orders`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    const json = await response.json();
    return json;
}

export async function cancelOrder(orderId: string): Promise<any> {
    const response = await fetch(`${orderApiPath}/orders/${orderId}`, {
        method: 'DELETE',
    });
    const json = await response.json();
    return json;
}
