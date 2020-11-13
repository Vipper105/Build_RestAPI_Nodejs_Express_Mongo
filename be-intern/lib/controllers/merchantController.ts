
import { Request, Response } from "express";
import { IMerchant, Merchant } from "../modules/model/Merchant";

export class merchantController{ 

  public async create(req: Request, res: Response): Promise<void> { 
    const newMerchant: IMerchant = new Merchant(req.body);
    await newMerchant.save();
    res.json({status: res.status,data:newMerchant});
  }

  // get all
  public async getOrders(req: Request, res: Response): Promise<void> {
    const merchants = await Merchant.find();
    res.json({ merchants });
  }

  // get one
  public async getOrder(req: Request, res: Response): Promise<void> {
    const merchant = await Merchant.findOne({ _id: req.params.id });
    res.json({ merchant });
  }

  public async update(req: Request, res: Response): Promise<void> {
    // find note and update it with the request body
    const merchant = await Merchant.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json({ status: res.status, data: merchant });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await Merchant.findOneAndDelete({ _id: req.params.id }),
      res.json({ response: "Merchant is delete successfully" });
  }

}