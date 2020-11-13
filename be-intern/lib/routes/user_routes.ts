import { Application, NextFunction, Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { Authentication } from "../modules/common/authentication";
import { TokenCheckMiddleware } from "../middlewares/AuthMiddleware";
import { validateMiddleWare } from "../middlewares/ValidateMiddleware";
import { IUser, User, validateUser } from "../modules/model/User";
import * as bearerToken from "express-bearer-token";
import {
  test_message,
  wrong_email,
  success_req,
} from "../modules/common/message";
import { validate } from "class-validator";

export class UserRoutes {
  private user_controller: UserController = new UserController();
  private authen: Authentication = new Authentication();

  public route(app: Application) {
    //==========    API Test    ================
    //app.use(TokenCheckMiddleware);
    app.get("/api/test", (req: Request, res: Response) => {
      res.status(200).json({ message: success_req });
    });

    app.post("/api/test", (req: Request, res: Response) => {
      res.status(200).json({ message: "Post request successfull" });
    });

    // =============    API user    ==============
    app.post(
      "/api/user",
      validateMiddleWare(validateUser),
      (req: Request, res: Response) => {
        this.authen.authenKey(req, res, () => {
          this.user_controller.create(req, res);
        });
      }
    );

    app.put("/api/user/:id", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.user_controller.update(req, res);
      });
    });

    app.delete("/api/user/:id", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.user_controller.delete(req, res);
      });
    });

    // route login
    app.post("/api/login/", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.user_controller.login(req, res);
      });
    });

    app.post("/api/refresh_token", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.user_controller.refreshToken(req, res);
      });
    });

    // register route
    app.post("/api/register/", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.user_controller.register(req, res);
      });
    });

    app.get(
      "/api/user/:id",
      TokenCheckMiddleware,
      (req: Request, res: Response) => {
        this.authen.authenKey(req, res, () => {
          this.user_controller.getUser(req, res);
        });
      }
    );
    // Tất cả các api các bạn khai báo dưới dòng này đều sẽ chạy qua cái isAuth trong AuthMiddleware
    // để kiểm tra xác thực cái token hợp lệ thì mới cho đi xử lý tiếp sang bên controller

    app.use(TokenCheckMiddleware);
    app.get("/api/user", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.user_controller.getUsers(req, res);
      });
    });

    // change password
    app.put("/api/user/change_pwd/:id", (req: Request, res: Response) => {
      this.authen.authenKey(req, res, () => {
        this.user_controller.changePassword(req, res);
      });
    });

    /*
    
    // Testing cache when call api from spaceX
    const redis = require("redis");
    const redisClient = redis.createClient(6379);
    const fetch = require("node-fetch");
    
    const set = (key, value) => {
      redisClient.set(key, JSON.stringify(value));
    };
    const get = (req, res, next) => {
      let key = req.route.path;
      redisClient.get(key, (error, data) => {
        if (error) res.status(400).send(error);
        if (data !== null) res.status(200).send(JSON.parse(data));
        else next();
      });
    };
    app.get("/spacex/launches", get, (req, res) => {
      fetch("https://api.spacexdata.com/v3/launches/latest")
        .then((res) => res.json())
        .then((json) => {
          set(req.route.path, json);
          res.status(200).send(json);
        })
        .catch((error) => {
          console.error(error);
          res.status(400).send(error);
        });
    });

    */
  }
}
