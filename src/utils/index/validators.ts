import { query } from 'express-validator';

import {
    generateStringValidator,
    generateAtLeastOneKeyValidator,
    generateShelfLifeValidator,
} from '../validation/customValidators';
import {
    headerTenantIdValidator,
    idParamValidator,
    getAllValidator,
} from '../validation/validators/common';

export const createValidator = [
    generateStringValidator(['alias']),
    generateStringValidator(['mainEstablishmentId'], undefined, true),
    generateShelfLifeValidator(['validFrom, validTo']),
].concat(headerTenantIdValidator);

export const getProfileValidator = [idParamValidator].concat(
    headerTenantIdValidator,
);

export const updateProfileValidator = [
    generateStringValidator(['alias'], undefined, true),
    generateShelfLifeValidator(['validFrom, validTo']),
    generateAtLeastOneKeyValidator(),
    idParamValidator,
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
    query('alias').optional().isString().withMessage(MSG_TYPE_STR),
    query('withPagination')
        .optional()
        .isBoolean()
        .withMessage(`the value must be boolean`),
    query('active').optional().isBoolean().withMessage(`the value must be boolean`),
].concat(getAllValidator);
