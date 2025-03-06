import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";


export class Service {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);

    }



    async createPost({ title, slug, content, feturedImage, userId, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    feturedImage,
                    userId,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite service error :: createPost :: error ", error)
        }
    }


    async updatePost(slug, { title, content, feturedImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    feturedImage,
                    status
                }
            )

        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }


    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,

            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false;
        }
    }


    async getPost(slug) {    // get 1 post
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,

            )

        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false;
        }
    }


    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries, // Ca directly use the query or queries here

            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false;

        }
    }


    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketID,
                fileId

            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false;
        }

    }


    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )

    }


}

const service = new Service()
export default service;