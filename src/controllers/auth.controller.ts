import { AuthRequest } from "../types/auth.types";
import { Response } from "express";
import userService from "../services/user.service";


export interface IAuthController {
    login: (req:AuthRequest, res:Response) => Promise<Response>
    register: (req:AuthRequest, res:Response) => Promise<Response>
}


class AuthController implements IAuthController {
    async login(req:AuthRequest, res:Response): Promise<Response> {
        const user = await userService.getAuthenticatedUser(req.username, req.password);
        if (user) {
            return res.json(`${user.username} logged in`);
        }
        return res.json("Woops, invalid username/password");
    }

    async register(req:AuthRequest, res:Response): Promise<Response> {
        const regSuccess = await userService.addUser(req.username, req.password);
        if (regSuccess) {
            return res.json(`${req.username} registered`);
        }

        return res.json("User already exists");
    }
}

export default new AuthController as IAuthController;
