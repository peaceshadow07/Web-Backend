const {MongoClient} = require("mongodb");
const PASSWORD = require("./creds");
async function connectDB(){

    const uri = `mongodb+srv://foodApp101:${PASSWORD}@cluster0.khupkwj.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        // await listDatabases(client);
        return client;
    } catch (error) {
        console.error(error);
    }finally{
        await client.close();
    }

}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// main().catch(console.error);

module.exports = connectDB;