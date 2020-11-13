import * as jwthelper from "../helpers/jwt.helper"; 
import {Response,NextFunction } from "express";

// Middleware xác thực người dùng dựa vào mã token

export const TokenCheckMiddleware = async (req:any, res:Response, next:NextFunction) => {
  // Lấy thông tin mã token được đính kèm trong request
  const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (tokenFromClient) {
    // Xác thực mã token và kiểm tra thời gian hết hạn của mã
    try {
      const decoded = await jwthelper.verifyToken(tokenFromClient, process.env.ACCESS_TOKEN_SECRET);
      // Lưu thông tin giãi mã được vào đối tượng req, dùng cho các xử lý ở sau
      req.decoded = decoded;
      // Cho phép req đi tiếp sang controller.
      next();
    } catch (err) {
      // Giải mã gặp lỗi: Không đúng, hết hạn...
      console.error(err);
      return res.status(401).json({
        message: 'Unauthorized access.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}