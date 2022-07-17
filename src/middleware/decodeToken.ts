import jwt from "jsonwebtoken";
import { secretKey } from "../env/env";
import { User } from "../types/user.types";

export function decodeToken(token:string):number {
    const decoded = jwt.verify(token, secretKey) as {
        user: User
    };
    return decoded.user.id
}