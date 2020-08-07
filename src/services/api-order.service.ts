import {Order} from "../common/types";

export function getListOrders(): List<Order> {
    throw new Error("Implement me")
}

export function getOrderDetails(orderId: string): Order {
    throw new Error("Implement me")
}

export function createOrder() {
    throw new Error("Implement me")
}

export function cancelOrder(orderId: string) {
    throw new Error("Implement me")
}