import { Application, NextFunction, Request, Response } from "express";
import { OrderController } from "../controllers/orderController";
import { Authentication } from "../modules/common/authentication";

export class OrderRoute {
  private order_Controller: OrderController = new OrderController();
  private authen: Authentication = new Authentication();

  public route(app: Application) {
    app.get("/api/order", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.order_Controller.getOrder(req, res);
      });
    });

    // add
    app.post("/api/order", (req: Request, res: Response) => {
      //
      this.authen.authenKey(req, res, () => {
        this.order_Controller.create(req, res);
      });
    });

    // edit
    app.put("/api/order/:id", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.order_Controller.update(req, res);
      });
    });

    // delete
    app.delete("/api/order/:id", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.order_Controller.delete(req, res);
      });
    });
  }
}
