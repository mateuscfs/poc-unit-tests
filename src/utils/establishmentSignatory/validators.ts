import { param, query } from 'express-validator';
import {
    generateArrayValidator,
    generateUuidValidator,
    getByIdValidator,
} from '../validation/customValidators';
import {
    getAllValidator,
    headerTenantIdValidator,
} from '../validation/validators/common';

export const createValidator = [
    generateUuidValidator(['establishmentId', 'signatoryId']),
    generateArrayValidator(['person_type']),
].concat(headerTenantIdValidator);

const establishmentSignatory = ['person_type'];

export const getAllWithSort = [
    query('sortParam').optional().isIn(establishmentSignatory),
    query('name').optional().isString(),
    query('withPagination').optional().isBoolean(),
].concat(getAllValidator);

export const getAllByProfileWithSort = [
    query('sortParam').optional().isIn(establishmentSignatory),
    query('name').optional().isString(),
    query('withPagination').optional().isBoolean(),
    query('active').optional().isBoolean(),
]
    .concat(getAllValidator)
    .concat(getByIdValidator);

export const updateValidator = [
    param(['id']).isUUID(),
    generateArrayValidator(['person_type']),
].concat(headerTenantIdValidator);
