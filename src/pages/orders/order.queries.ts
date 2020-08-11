import { useQuery, useMutation, queryCache } from 'react-query'
import {cancelOrder, createOrder, getListOrders, getOrderDetails} from "../../services/api-order.service";

// get all orders query
export const useAllOrderQuery = () => {
    const filter = {};
    return useQuery(
        'allOrders',
        () => {
            return getListOrders()
        },
        {
            // Refetch the data every second
            refetchInterval: 2000,
        }
    );
};

// create order query
export const useCreateOrderQuery = () => {
    return useMutation(
        (data: {
            details: any
        }) => {
            return createOrder({details: data.details})
        },
        {
            // invalidate and get newest orders
            onSuccess: () => queryCache.invalidateQueries('allOrders'),
        }
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
