import { Request, Response } from "express";
import { unautorized } from "./service";
import * as dotenv from "dotenv";

dotenv.config();
export class Authentication {
  
  private keyAuthen: String = process.env.KEY_AUTHEN;

  public authenKey(req: Request, res: Response, callback: any): void {
    if (req.query.key !== this.keyAuthen) {
      unautorized("Authen fail", res);
    } else {
      callback();
    }
  }
}
