import { query } from 'express-validator';

import {
    generateStringValidator,
    generateAtLeastOneKeyValidator,
    generateShelfLifeValidator,
    generateArrayValidator,
    generateBooleanValidator,
    generateNumberValidator,
} from '../validation/customValidators';
import {
    headerTenantIdValidator,
    idParamValidator,
    getAllValidator,
} from '../validation/validators/common';

export const createValidator = [
    generateStringValidator(['name']),
    generateNumberValidator(['number']),
    generateArrayValidator(['array']),
    generateBooleanValidator(['active']),
].concat(headerTenantIdValidator);

export const getProfileValidator = headerTenantIdValidator;

export const updateProfileValidator = [
    generateStringValidator(['name', 'id']),
    generateNumberValidator(['number']),
    generateArrayValidator(['array']),
    generateBooleanValidator(['active']),
].concat(headerTenantIdValidator);

const profileParams = ['validFrom', 'validTo', 'alias', 'created_at'];

export const getAllWithSort = [
    query('sortParam')
        .optional()
        .isIn(profileParams)
        .withMessage(`Param is not ${profileParams.toString()}.`),
    query('expand')
        .optional()
        .isBoolean()
        .withMessage(`the value must be a boolean.`),
    query('withPagination')
        .optional()
        .isBoolean()
        .withMessage(`the value must be boolean`),
    query('active').optional().isBoolean().withMessage(`the value must be boolean`),
].concat(getAllValidator);
