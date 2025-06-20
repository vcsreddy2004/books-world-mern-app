import dotenv from "dotenv";
dotenv.config();
const PORT:string | undefined = process.env.PORT;
const MONGO_DB_URL:string | undefined= process.env.MONGO_DB_URL;
const SECRETE_KEY:string | undefined = process.env.SECRETE_KEY;
export default {PORT,MONGO_DB_URL,SECRETE_KEY}