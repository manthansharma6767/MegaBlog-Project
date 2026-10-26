const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL ?? ''),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID ?? ''),
    appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID ?? import.meta.env.VITE_DATABASE_ID ?? ''),
    appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID ?? ''),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID ?? ''),
}

export { conf }
export default conf

// we created a config file becuase we want to import all details and important url database id table id
// from the env file so we wrapped all that in a config object and we can import it any where in the
// without importing, with those numbers of database id in every where and which is very bad practice
// we can access it anywhere by importing it in other functions with the help of
// export conf