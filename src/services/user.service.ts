import userStore from "../stores/user.store";
import { User } from "../types/user.types";


interface IUserService {
    getAuthenticatedUser: (username:string, password:string) => Promise<User | null>
    addUser: (username:string, password:string) => Promise<boolean>
}

class UserService implements IUserService {
    async getAuthenticatedUser(username:string, password:string): Promise<User | null> {
        const user = await userStore.getUser(username);
        if (user && user.password === password) {
            return user;
        }

        return null;
    }

    async addUser(username:string, password:string): Promise<boolean> {
        const userExists = await userStore.userExists(username);
        if (userExists) {
            return false;
        }
        await userStore.addUser(username, password);
        return true;
    }
}

export default new UserService as IUserService;