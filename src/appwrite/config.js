import conf from '../conf/conf.js';
import { Client, Databases, Storage, Query, ID } from 'appwrite';

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

    async createPost({ title, content, slug, featuredImage, status, userId }) {
        return await this.databases.createDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        );
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        );
    }

    async deletePost(documentId, { collectionId, databaseId } = {}) {
        if (!databaseId || !collectionId) {
            return false;
        }

        await this.databases.deleteDocument(databaseId, collectionId, documentId);
        return true;
    }

    async getPost(slug) {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            [Query.equal('$id', slug)]
        );
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            queries
        );
    }

    async uploadFile(file) {
        return await this.bucket.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file
        );
    }

    async deleteFile(fileId) {
        await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
        return true;
    }

    async filePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketID, fileId);
    }
}

const service = new Service();

export default service;