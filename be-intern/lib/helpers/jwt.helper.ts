import * as jwt from "jsonwebtoken";

/*
export const generateToken = (user:any, secretSignature:string, tokenLife:string):string => {
    // Thực hiện ký và tạo token
    const token= jwt.sign(
      {data: user.toJSON()},
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    )
  
  return token;
}
*/

export const verifyToken = (token:string, secretKey:string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
}