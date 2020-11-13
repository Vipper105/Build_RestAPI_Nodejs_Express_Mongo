import { merchantController } from "../controllers/merchantController";
import { Application, NextFunction, Request, Response } from "express";
import { Authentication } from "../modules/common/authentication";

export class MerchantsRoute {
  private merchat_Controller: merchantController = new merchantController();
  private authen: Authentication = new Authentication();

  public route(app: Application) {
    app.get("/api/merchant", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.merchat_Controller.getOrder(req, res);
      });
    });

    // add
    app.post("/api/merchant", (req: Request, res: Response) => {
      //
      this.authen.authenKey(req, res, () => {
        this.merchat_Controller.create(req, res);
      });
    });

    // edit
    app.put("/api/merchant/:id", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.merchat_Controller.update(req, res);
      });
    });

    // delete
    app.delete("/api/merchant/:id", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.merchat_Controller.delete(req, res);
      });
    });
  }
}
