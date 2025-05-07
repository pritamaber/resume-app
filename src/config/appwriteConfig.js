// src/appwriteConfig.js
import { Client, Account, Databases, Storage, Functions } from "appwrite";

// Initialize the Appwrite client with your endpoint and project ID
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // e.g. https://fra.cloud.appwrite.io/v1
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // e.g. 68024355002c819ce2b4

// Export Appwrite services for use across your app
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
