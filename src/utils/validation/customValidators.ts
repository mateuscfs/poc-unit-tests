import { body, ValidationChain, param } from 'express-validator';
import { headerTenantIdValidator } from './validators/common';

const generateDeepPath = (path: string, fields: string[]) => {
    return fields.map(field => `${path}.${field}`);
};

export const getByIdValidator = [param(['id']).isUUID()].concat(
    headerTenantIdValidator,
);

export const generateStringValidator = (
    fields: Array<string>,
    path = '',
    optional?: boolean,
): ValidationChain => {
    const deepFields = generateDeepPath(path, fields);

    if (optional) return body(deepFields).isString().optional({ checkFalsy: true });

    return body(deepFields).isString();
};

export const generateArrayValidator = (
    fields: Array<string>,
    path = '',
    optional?: boolean,
): ValidationChain => {
    const deepFields = generateDeepPath(path, fields);

    if (optional) return body(deepFields).isArray().optional({ checkFalsy: true });

    return body(deepFields).isArray();
};

export const generateBooleanValidator = (
    fields: Array<string>,
    path = '',
    optional?: boolean,
): ValidationChain => {
    const deepFields = generateDeepPath(path, fields);

    if (optional) return body(deepFields).isBoolean().optional({ checkFalsy: true });

    return body(deepFields).isArray();
};
export const generateShelfLifeValidator = (
    fields: Array<string>,
    path = '',
    optional = false,
): ValidationChain => {
    const deepFields = generateDeepPath(path, fields);

    return body(deepFields).optional(optional);
};

export const generateAtLeastOneKeyValidator = (): ValidationChain => {
    return body().custom((_, { req }) => {
        if (Object.keys(req.body)?.length === 0) throw new Error();
        return true;
    });
};

export const generateUuidValidator = (
    fields: Array<string>,
    path = '',
    optional?: boolean,
): ValidationChain => {
    const deepFields = generateDeepPath(path, fields);

    if (optional) return body(deepFields).isUUID().optional({ checkFalsy: true });

    return body(deepFields).isUUID();
};

export const generateOptionalObjectValidator = (
    path: string,
    internalValidator: ValidationChain[],
): ValidationChain => {
    return body(path).custom((value, { req }) => {
        if (value) return internalValidator.map(validator => validator.run(req));

        return true;
    });
};

export const generateCpfValidator = (
    path: string,
    optional = false,
): ValidationChain => {
    return body(path).optional(optional);
};

export const generateCnpjValidator = (
    path: string,
    optional = false,
): ValidationChain => {
    return body(path).optional(optional);
};
