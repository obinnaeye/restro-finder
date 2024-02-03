import { Request, Response } from "express";
import { get } from "lodash";
import {
  createRestro,
  findRestro,
  findAndUpdate,
  deleteRestro,
  findRestros,
} from "../service/restro.service";
import { getDistnce } from "../utils/get-distance";

export async function createRestroHandler(req: Request, res: Response) {
  const body = req.body;
  const restro = await createRestro(body);

  return res.send(restro);
}

export async function updateRestroHandler(req: Request, res: Response) {
  const restroId = get(req, "params.restroId");
  const { name, address, longitude, latitude } = req.body;
  const restro = await findRestro({ restroId });

  if (!restro) {
    return res.sendStatus(404);
  }

  const updatedRestro = await findAndUpdate(
    { restroId },
    {
      ...(name && { name }),
      ...(address && { address }),
      ...(longitude && { longitude }),
      ...(latitude && { latitude }),
    },
    { new: true },
  );

  return res.send(updatedRestro);
}

export async function getRestrosHandler(req: Request, res: Response) {
  const restros = await findRestros(req.query || {});

  return res.send(restros);
}

export async function filterRestrosHandler(req: Request, res: Response) {
  const { city, latitude, longitude, distance } = req.query;
  if (!city || !latitude || !longitude || !distance) {
    res.status(401);
    throw new Error("Bad request");
  }
  console.log(Number(latitude));
  const restros = await findRestros({
    address: new RegExp(`.*${city}.*`),
  });

  const nearestRestros = restros.filter((restro) => {
    const dist = getDistnce(
      Number(longitude),
      restro.longitude,
      Number(latitude),
      restro.latitude,
    );
    return dist <= Number(distance);
  });

  return res.send(nearestRestros);
}

export async function getRestroByIdHandler(req: Request, res: Response) {
  const restroId = get(req, "params.restroId");
  const restro = await findRestro({ restroId });

  if (!restro) {
    return res.sendStatus(404);
  }

  return res.send(restro);
}

export async function deleteRestroHandler(req: Request, res: Response) {
  const restroId = get(req, "params.restroId");
  const restro = await findRestro({ restroId });

  if (!restro) {
    return res.sendStatus(404);
  }

  await deleteRestro({ restroId });

  return res.sendStatus(200);
}
