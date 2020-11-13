import {Request,Response,NextFunction } from "express";

export const validateMiddleWare = (validator:any) => {
  return (req:Request, res:Response, next:NextFunction) => {
    const { error } = validator(req.body)
    console.log('validate error: ', error)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    next()
  }
}