import {orderHostname} from "../common/config";
import {getAuthInfo} from "../modules/auth/auth";

const orderApiPath = `${orderHostname}/api/orders`;
const orderHeaders = Object.assign({'Content-Type': 'application/json'}, getAuthInfo());

export const getListOrders = async (): Promise<any> => {
    const response = await fetch(`${orderApiPath}/orders`, {
        method: 'GET',
        headers: orderHeaders
    });
    const json = await response.json();
    return json;
};

export async function getOrderDetails(orderId: string): Promise<any> {
    const response = await fetch(`${orderApiPath}/orders/${orderId}`, {
        method: 'GET',
        headers: orderHeaders,
    });
    const json = await response.json();
    return json;
}

export async function createOrder(data: any): Promise<any> {
    const response = await fetch(`${orderApiPath}/orders`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: orderHeaders
    });
    const json = await response.json();
    return json;
}

export async function cancelOrder(orderId: string): Promise<any> {
    const response = await fetch(`${orderApiPath}/orders/${orderId}`, {
        method: 'DELETE',
        headers: orderHeaders
    });
    const json = await response.json();
    return json;
}
