export interface IOrderItems{
    quantity: number;
    product: string
}

export interface IOrder{
    orderItems: IOrderItems[];
    shippingAddress1: string;
    shippingAddress2: string;
    city: string,
    zip: string,
    country: string,
    phone: string,
    status: string
    user: string
}