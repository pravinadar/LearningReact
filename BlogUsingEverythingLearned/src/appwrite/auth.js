// we could have directly copied the given code from appwrite and have added our credentials but we are doing this
// because this a better practice and better quality of code and helps to migrate faster if we want to change vendors or
// do everything ourselves.

// if we directly have used appwrite's method which was shown in the documentation then we would have had to expose some of our backend
// the gui components we make which would have got chaotic and is not a very good practice.

// we are making something which we can use for any website for which we use appwrite as backend
// and even if we want to change our backend service provider, majority of the changes would have to be done here

import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                return this.login({ email, password })

            } else {
                return userAccount
            }
        } catch (error) {
            throw (error)
        }
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw (error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUSer :: error", error);
        }
        return null;
    }

    async logOut() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw (error);
        }
    }
}
// stuff is done in a similar way in the documentation. we just modified it to write this good quality code
// we just created a class in which everything is done 
// we are making methods in this class which will have the appwrite functions because when we give every vendor
// functions in the ui itself then we would have to do changes everywhere in the ui. 
// But since we are using this method of creating a class and having constructors and methods here,
// changes will take place by itself when we do all the changes we want in this file only. So this is a very good practice

const authService = new AuthService();


export default authService;