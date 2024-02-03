import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import Restro, { RestroDocument } from "../model/restro.model";

export function createRestro(input: DocumentDefinition<RestroDocument>): any {
    return Restro.create(input);
}

export function findRestro(
    query: FilterQuery<RestroDocument>,
    options: QueryOptions = { lean: true }
) {
    return Restro.findOne(query, {}, options);
}

export function findRestros(
    query: FilterQuery<RestroDocument>
) {
    return Restro.find(query);
}

export function findAndUpdate(
    query: FilterQuery<RestroDocument>,
    update: UpdateQuery<RestroDocument>,
    options: QueryOptions
) {
    return Restro.findOneAndUpdate(query, update, options);
}

export function deleteRestro(query: FilterQuery<RestroDocument>) {
    return Restro.deleteOne(query);
}
