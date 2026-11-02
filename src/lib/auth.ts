import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const globalForMongo = globalThis as unknown as {
  __mongoClient?: MongoClient;
};

// Reuse a single MongoClient across hot reloads in dev. Creating a new client
// at module scope makes the first request after an HMR reload hit a client
// whose connection topology has already been closed, which crashes
// auth.api.getSession with MongoTopologyClosedError.
const client =
  globalForMongo.__mongoClient ??
  new MongoClient(process.env.MONGODB_URI as string);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__mongoClient = client;
}

const db = client.db('b14-a8-category-hermione');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true,
    minPasswordLength: 6 
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});