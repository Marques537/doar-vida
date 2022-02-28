import { Request, Response, NextFunction, response } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config()

class Authenticate{
   
  static getJWT(userID: any){
    const token = jwt.sign({ userID }, process.env.TOKEN_SECRET, { expiresIn: 1000 });
    return token;

  }
  static ensureAuthenticated = (request: Request, response: Response, next: NextFunction) =>{
    const token = request.headers['x-access-token'];
    if (token === undefined){
      return response.status(401).json({message: 'token not provided.'});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err:any, decoded: any) =>{
      if( err ) return response.status(401).json({message: err.message});
      next();
    }); 
  }
}

export default Authenticate;