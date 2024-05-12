import * as mongodb from "mongodb";
import { User } from "../model/user";
import { Form } from "../model/form";
import { Submit } from "../model/submit";

export let collections: {
    users: mongodb.Collection<User>,
    forms: mongodb.Collection<Form>,
    submits: mongodb.Collection<Submit>,
} 

export async function connect() {
    console.log(process.env.DB_CONN_STR!);
    const client = new mongodb.MongoClient(process.env.DB_CONN_STR!);
    await client.connect();
    const db = client.db(process.env.DB_NAME!);
    collections = {
        users: db.collection('users'),
        forms: db.collection('forms'),
        submits: db.collection('submits'),
    };
}
