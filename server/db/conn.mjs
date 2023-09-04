import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
	conn = await client.connect();
} catch (e) {
	console.error(e);
}

// To update to the name of our database
let db = conn.db("sample_training");

export default db;
