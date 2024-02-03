import { Express, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import {
  createRestroHandler,
  filterRestrosHandler,
  getRestroByIdHandler,
  getRestrosHandler,
  updateRestroHandler,
} from "./controller/restro.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler,
} from "./controller/session.controller";
import requiresUser from "./middleware/requires-user";
import validateRequest from "./middleware/validate-request";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createRestroSchema,
  filterRestroSchema,
  updateRestroSchema,
} from "./schema/restro.schema";

export default function (app: Express) {
  app.get("/healthcheck", (_, res: Response) => res.sendStatus(200));

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/:version/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler,
  );

  // Get the user's sessions
  app.get("/api/:version/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete(
    "/api/:version/sessions",
    requiresUser,
    invalidateUserSessionHandler,
  );

  // Create restro
  app.post(
    "/api/:version/restros",
    validateRequest(createRestroSchema),
    requiresUser,
    createRestroHandler,
  );

  // Get restros
  app.get("/api/:version/restros", getRestrosHandler);

  // Filter restros
  app.get(
    "/api/:version/filteredrestros",
    validateRequest(filterRestroSchema),
    requiresUser,
    filterRestrosHandler,
  );

  // Get a specific restro
  app.get("/api/:version/restro/:restroId", requiresUser, getRestroByIdHandler);

  // Update restros
  app.put(
    "/api/:version/restro/:restroId",
    validateRequest(updateRestroSchema),
    requiresUser,
    updateRestroHandler,
  );
}
