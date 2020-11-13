import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
  unautorized,
} from "../modules/common/service";
import * as bcrypt from "bcrypt";
import { IUser, User, validateUser } from "../modules/model/User";
import * as jwt from "jsonwebtoken";
import * as jwthelper from "../helpers/jwt.helper";

let tokenList = {};
export class UserController {
  private lengthRandomString: number = 10;

  public async create(req: Request, res: Response): Promise<void> {
    const user = await User.findOne({ email: req.body.email });

    if (user == null) {
      const newUser: IUser = new User(req.body);
      // encrypt Bcrypt
      const passwordInPLaintext = newUser.password;
      const hashedPassword = await bcrypt.hash(
        passwordInPLaintext,
        Math.random() * 12 + 5
      );
      const hashedRdPassword =
        hashedPassword + this.makeRandomString(this.lengthRandomString);

      newUser.password = hashedRdPassword;
      await newUser.save();
      res.json({ status: res.status, data: newUser });
    } else {
      unautorized("Email has been used", res);
    }
  }

  public makeRandomString(length: Number): string {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charLength = characters.length;
    for (let i = 0; i < length; ++i) {
      result += characters.charAt(Math.floor(Math.random() * charLength));
    }

    return result;
  }

  // get all
  public async getUsers(req: Request, res: Response): Promise<void> {
    const users = await User.find();
    res.json({ users });
  }

  // get one
  public async getUser(req: Request, res: Response): Promise<void> {
    const user = await User.findOne({ _id: req.params.id });
    res.json({ user });
  }

  public async update(req: Request, res: Response): Promise<void> {
    // find note and update it with the request body
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json({ status: res.status, data: user });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await User.findOneAndDelete({ _id: req.params.id }),
      res.json({ response: "User is delete successfully" });
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    const user_filter = { _id: req.params.id };
    await User.findOne(user_filter, async (err: any, user: any) => {
      
      const repassword = user.password;
      const passwordDB = repassword.substring(0,repassword.length-this.lengthRandomString);

      const match = await bcrypt.compare(req.body.oldPassword, passwordDB);
      if (!match) {
        res.status(400).json({ response: "Old Password is incorrect" });
      } else if (req.body.newPassword == req.body.oldPassword) {
        res
          .status(400)
          .json({ response: "New Password need to diffrent to Old password" });
      } else {
        // success
        const passwordInPLaintext = req.body.newPassword;
        const hashedPassword = await bcrypt.hash(
          passwordInPLaintext,
          Math.random() * 12 + 5
        );
        const hashedRdPassword =
          hashedPassword + this.makeRandomString(this.lengthRandomString);

          req.body.password = hashedRdPassword;
      
        await this.update(req, res);
      }
    });
  }

  // get User by username, password
  public async login(req: Request, res: Response): Promise<void> {
    //const newUser: IUser = new User(req.body);
    const user_filter = { email: req.body.email };
    await User.findOne(user_filter, async (err: any, user: any) => {
      // const newUser: IUser = user;
      if (user != null) {
        // decrypt
         const repassword = user.password;
        const passwordDB = repassword.substring(0,repassword.length-this.lengthRandomString);

        const match = await bcrypt.compare(req.body.password, passwordDB); //  ???
        if (match) {
          //
          const token = jwt.sign(
            user.toJSON(),
            process.env.ACCESS_TOKEN_SECRET,
            {
              algorithm: "HS256",
              expiresIn: "1h",
            }
          );
          //const token = jwthelper.generateToken(user, process.env.REFRESH_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFE);

          const refreshToken = jwt.sign(
            user.toJSON(),
            process.env.REFRESH_TOKEN_SECRET,
            {
              algorithm: "HS256",
              expiresIn: "1h",
            }
          );
          //const refreshToken = jwthelper.generateToken(user, process.env.REFRESH_TOKEN_SECRET,process.env.ACCESS_TOKEN_LIFE);

          tokenList[refreshToken] = { token, refreshToken };

          const response = {
            token,
            refreshToken,
          };
 
          res.json(response);
        } else {
          unautorized("Password is incorrect", res);
        }
      } else {
        unautorized("User not existed", res);
      }
    });
  }

  public async refreshToken(req: Request, res: Response): Promise<void> {
    // User gửi mã Refresh token kèm theo trong body
    const refreshTokenFromClient: string = req.body.refreshToken;
    // Kiểm tra Refresh token có được gửi kèm và mã này có tồn tại trên hệ thống hay không
    if (refreshTokenFromClient && refreshTokenFromClient in tokenList) {
      try {
        // Kiểm tra mã Refresh token
        await jwthelper.verifyToken(
          refreshTokenFromClient,
          process.env.REFRESH_TOKEN_SECRET
        );
        // Lấy lại thông tin user
        const user = tokenList[refreshTokenFromClient];
        // Tạo mới mã token và trả lại cho user
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });
        const response = {
          token,
        };
        res.status(200).json(response);
      } catch (err) {
        console.error(err);
        res.status(403).json({
          message: "Invalid refresh token",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid request",
      });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    await this.create(req, res);
  }
}
