import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (accessToken === process.env.adminToken) {
    return next();
  }
  const user = get(req, "user");

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requiresUser;
