import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        const userAccount = await this.account.create(ID.unique(), email, password, name);

        if (userAccount) {
            return await this.login({ email, password });
        }

        return userAccount;
    }

    async login({ email, password }) {
        return await this.account.createEmailPasswordSession(email, password);
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error?.code === 401 || error?.type === 'user_unauthorized') {
                return null;
            }

            console.error('Failed to fetch current user:', error);
            return null;
        }
    }

    async logout() {
        await this.account.deleteSessions();
    }
}

const authService = new AuthService();

export default authService;