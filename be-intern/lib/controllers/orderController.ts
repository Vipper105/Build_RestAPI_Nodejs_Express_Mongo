import { Request, Response } from "express";
import { IOrder, Order } from "../modules/model/Order";


export class OrderController { 

  public async create(req: Request, res: Response): Promise<void> { 
    const newOrder: IOrder = new Order(req.body);
    await newOrder.save();
    res.json({status: res.status,data:newOrder});
  }

  // get all
  public async getOrders(req: Request, res: Response): Promise<void> {
    const orders = await Order.find();
    res.json({ orders });
  }

  // get one
  public async getOrder(req: Request, res: Response): Promise<void> {
    const order = await Order.findOne({ _id: req.params.id });
    res.json({ order });
  }

  public async update(req: Request, res: Response): Promise<void> {
    // find note and update it with the request body
    const order = await Order.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json({ status: res.status, data: order });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await Order.findOneAndDelete({ _id: req.params.id }),
      res.json({ response: "Order is delete successfully" });
  }

  // find nearest distance about 5km  
  public async findNearestDistance(req: Request, res: Response): Promise<void> {
    

  }

}