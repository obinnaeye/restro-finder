import 'dotenv/config'
import express from "express";
import config from "config";
import swaggerUi from "swagger-ui-express";
import { createServer } from 'http' ;
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import deserializeUser from "./middleware/deserialize-user";
import * as swggerDoc from "../swagger.json";
import cors from 'cors';

const port = Number(process.env.PORT) || config.get("port") as number;
const host = config.get("host") as string;
const app = express();
const allowedOrigins = ['http://localhost:8181'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swggerDoc)
);
// app.use(requiresUser)

const server = createServer(app);
server.listen(port, () => {
  log.info(`Server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
