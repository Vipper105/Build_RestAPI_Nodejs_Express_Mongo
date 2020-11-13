import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import environment from "../environment";
import { UserRoutes } from "../routes/user_routes";
import { OrderRoute } from "../routes/order_routes";
import { CommonRoutes } from "../routes/common_routes";
import { MerchantsRoute } from "../routes/merchant_routes";
import * as cors from "cors";
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as _ from "lodash";

// var cryto = require('crypto').randomBytes(64).toString('hex');
// console.log(cryto);

class App {
  public app: express.Application;
 // public mongoUrl: string ="mongodb://127.0.0.1:27017/" + environment.getDBName(); 
 private common_routes: CommonRoutes = new CommonRoutes();
  private user_routes: UserRoutes = new UserRoutes();
  private order_route: OrderRoute = new OrderRoute();
  private merchant_routes: MerchantsRoute = new MerchantsRoute();

  constructor() {
    dotenv.config();
    this.app = express();
    this.config();
    this.mongoSetup();
    this.route();
  }

  // routes
  private route(): void {
   
    this.user_routes.route(this.app);
    this.order_route.route(this.app);
    this.merchant_routes.route(this.app);
    this.common_routes.route(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression())
    this.app.use(cors());
  }

  private mongoSetup(): void {
    mongoose.connect(process.env.DB_LOCALHOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      // we're connected!
      console.log("we're connected!");
      console.log("Tenn DB"+ process.env.DB_LOCALHOST);
    });
  }
}

export default new App().app;
