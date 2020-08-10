import { useQuery, useMutation } from 'react-query'
import {cancelOrder, createOrder, getListOrders, getOrderDetails} from "../../services/api-order.service";

export const useAllOrderQuery = () => {
    const filter = {};
    return useQuery(
        'allOrders',
        () => {
            return getListOrders()
        },
    );
};

export const useCreateOrderQuery = () => {
    return useMutation(
        (data: {
            details: any
        }) => {
            return createOrder({details: data.details})
        },
    );
};


export const useGetOrderInformationQuery = () => {
    return useMutation(
        (orderId: string) => {
            return getOrderDetails(orderId)
        },
    );
};

export const useCancelOrderQuery = () => {
    return useMutation(
        (orderId: string) => {
            return cancelOrder(orderId)
        },
    );
};
