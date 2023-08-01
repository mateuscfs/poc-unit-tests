import { query, header, param } from 'express-validator';

export const headerTenantIdValidator = [header('tenantid').isString()];

export const paginationValidator = [
    query('page')
        .optional()
        .isNumeric({ no_symbols: true })
        .withMessage('Only integer values'),
    query('size')
        .optional()
        .isNumeric({ no_symbols: true })
        .withMessage('Only integer values'),
    query('sortOrder')
        .optional()
        .isIn(['desc', 'DESC', 'asc', 'ASC'])
        .withMessage('Only avaiable DESC and ASC values.'),
];

export const getByIdValidator = [
    query('expand').optional().isBoolean().withMessage('Only boolean value'),
    param(['id']).isUUID(),
].concat(headerTenantIdValidator);

export const idParamValidator = param('id').isString();

export const getAllByIdValidator = [param('id').isUUID()].concat(
    headerTenantIdValidator,
    paginationValidator,
);

export const withPatternMatchingFilterValidator = [
    query('withPatternMatching').optional().isIn(['true', 'True', 'false', 'False']),
];

export const getAllValidator = paginationValidator.concat(headerTenantIdValidator);
