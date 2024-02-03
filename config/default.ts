require("dotenv").config({
    path: `../.env`,
});
const privateKey = Buffer.from(process.env.PRIVATE_KEY || "dddd" , 'base64').toString('ascii');

export default {
    port: 8181,
    host: "localhost",
    dbUri: "mongodb://localhost:27017/restro-finder",
    privateKey,
    saltWorkFactor: 10,
    accessTokenTtl: "120m",
    refreshTokenTtl: "1y",
};
