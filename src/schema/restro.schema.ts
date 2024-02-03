import { object, string, number } from "yup";

export const createRestroSchema = object({
  body: object({
    name: string().min(3).required(),
    address: string().min(15).required(),
    latitude: number().required(),
    longitude: number().required(),
  }),
});

export const updateRestroSchema = object({
  body: object({
    name: string().notRequired(),
    address: string().notRequired(),
    latitude: number().min(0).notRequired().nullable(true).transform((_, val) => val === Number(val) ? val : null) ,
    longitude: number().min(0).notRequired().nullable(true).transform((_, val) => val === Number(val) ? val : null) ,
  }),
});

export const filterRestroSchema = object({
  query: object({
    distance: number().required(),
    city: string().required(),
    latitude: number().required(),
    longitude: number().required(),
  }),
});
