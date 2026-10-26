import conf from '../conf.js';
import {Client, ID , Databases, Storage, Query} from 'appwrite';


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title , content , slug , featuredImage , status , userId}) {
        try {
            const post = await this.databases.createDocument(
                conf.appwriteProjectID,
                conf.appwriteDatabaseID,
                slug,
                {
                    title: title,
                    content: content,
                    featuredImage: featuredImage,
                    status: status,
                    userId: userId
                }
            )
        }
        catch (error) {
            throw error;
        }
    }

    async updatePost(slug , {title , content , featuredImage , status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteProjectID,
                conf.appwriteDatabaseID,
                slug,
                {
                    title: title,
                    content: content,
                    featuredImage: featuredImage,
                    status: status
                }
            )
        }
        catch (error) {
            throw error;
        }
    }

    async deletePost(slug , {collectionId , databaseId , documentId}) {
        try {
            await this.databases.deleteDocument(
                databaseId,
                collectionId,
                documentId
            )
            return true;
        }
        catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug) {
        try{
            const posts = await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                conf.documentId,
            )
        }
        catch(error) {
            throw error;
        }

        return posts;
    }

    async getPosts(queries = [Query.equal("status" , "active")]) {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.collectionId,
                queries
            )
        }
        catch (error) {
            throw error
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        }
        catch (err) {
            throw err;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
        }
        catch (error) {
            throw error;
        }
    }

    async filePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }
}

const service = new Service();

export default Service;