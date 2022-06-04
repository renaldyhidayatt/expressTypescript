import { Request, Response } from 'express';
import { DaoOrder } from '../dao/dao.order';
import { IOrder, IOrderItems } from '../interface/IOrder';
import Order from '../models/model.order';
import OrderItem from '../models/model.orderItem';

class OrderService implements DaoOrder{
   async getAllOrders(req: Request, res: Response): Promise<any> {
        const orderList = await Order.find().populate('user', 'name').sort({ dateOrdered: -1 });

        if (!orderList) {
            return res.status(400).send({
                message: "No orders found"
            });
        }

        res.json(orderList);
    }
    async getOrder(req: Request, res: Response): Promise<any> {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name')
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: 'category'
                }
            });

        if (!order) {
            return res.status(400).send({
                message: "Order not found"
            });
        }

        res.json(order);
    }

    async createOrder(req: Request, res: Response): Promise<any> {
        const {
            orderItems,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            status,
            phone,
            user
        } : IOrder = req.body

        const orderItemsIds = Promise.all(
            orderItems.map(async (orderitem: IOrderItems) => {
                let newOrderItem = new OrderItem({
                    quantity: orderitem.quantity,
                    product: orderitem.product
                });

                newOrderItem = await newOrderItem.save();

                return newOrderItem._id;
            })
        );
        const orderItemsIdsResolved = await orderItemsIds;

        const totalPrices = await Promise.all(
            orderItemsIdsResolved.map(async (orderItemId) => {
                const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');

                const totalPrice = orderItem.product.price * orderItem.quantity;

                return totalPrice;
            })
        );
        const totalPricess = totalPrices.reduce((a, b) => a + b, 0);

        let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            status,
            totalPrice: totalPricess,
            user
        });

        order = await order.save();

        if (!order) {
            return res.status(400).send({
                message: "Order not created"
            });
        }

        return res.send(order);
    }
    async updateOrder(req: Request, res: Response): Promise<any> {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            }
        );

        if (!order) {
            return res.status(400).send({
                message: "Order not found"
            });
        }

        return res.send(order);
    }

    async deleteOrder(req: Request, res: Response): Promise<any> {
        await Order.findByIdAndRemove(req.params.id)
            .then(async (order) => {
                if (order) {
                    await order.orderItems.map(async (orderItem: any) => {
                        await OrderItem.findByIdAndRemove(orderItem);
                    });
                    return res.status(200).json({ success: true, message: 'the order is deleted!' });
                } else {
                    return res.status(404).json({ success: false, message: 'order not found!' });
                }
            })
            .catch((err) => {
                return res.status(500).json({ success: false, error: err });
            });
    }
}

export default new OrderService();