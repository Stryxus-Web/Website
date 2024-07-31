import { MongoClient } from 'mongodb';

var client: MongoClient | undefined;
var clientPromise: Promise<MongoClient> | undefined;

export function getDB(): Promise<MongoClient> {
    if (!client || !clientPromise) {
        console.log('Connecting to DB...');
        client = new MongoClient(import.meta.env.MONGO_CONNECTION_STRING as string);
        clientPromise = client.connect();
        console.log('Connected to DB.');
    }
    return clientPromise;
}

export async function getEmail() {
    try {
        const client = await getDB();
        const db = client.db('personalwebsite');
        const collection = db.collection('general');
        return await collection.find({}).toArray();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return [];
    }
}