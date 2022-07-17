import { AuthRequest } from "../types/auth.types";
import { Response } from "express";
import userService from "../services/user.service";
import jwt from "jsonwebtoken";
import { secretKey } from "../env/env";


export interface IAuthController {
    login: (req:AuthRequest, res:Response) => Promise<Response>
    register: (req:AuthRequest, res:Response) => Promise<Response>
}


class AuthController implements IAuthController {
    async login(req:AuthRequest, res:Response): Promise<Response> {
        const user = await userService.getAuthenticatedUser(req.username, req.password);
        if (user) {
            const token = jwt.sign({ user: user }, secretKey, {expiresIn: '60m'});
            return res.json({
                message: 'Login successful',
                token: token
            });  
        }

        return res.json("Woops, invalid username/password");
    }

    async register(req:AuthRequest, res:Response): Promise<Response> {
        const newUser = await userService.addUser(req.username, req.password);
        if (newUser) {
            const token = jwt.sign({ user: newUser }, secretKey, {expiresIn: '60m'});
            return res.json({
                message: 'Registration successful',
                token: token
            });
        }
        
        return res.json("User already exists");  
    }
}

export default new AuthController as IAuthController;
