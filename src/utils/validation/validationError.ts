/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line max-classes-per-file
import { Result, ValidationError } from 'express-validator';
import { HttpError } from '../errors';

const extractErrors = (validationErrors: ValidationError[]) => {
    let paramsErrors = validationErrors.map(error => error.param);
    validationErrors.forEach((error: any) => {
        if (error.nestedErrors) {
            const nestedErrorsParams = error.nestedErrors.map(
                (nestedError: { param: any }) => nestedError.param,
            );
            paramsErrors = paramsErrors.concat(nestedErrorsParams);
        }
    });
    return paramsErrors.filter(error => error !== '_error');
};

export const isParamsInValidationErrors = (
    params: string[],
    validationErrors: ValidationError[],
): boolean => {
    const validErrors = extractErrors(validationErrors);
    return params.every(error => validErrors.includes(error));
};

export class ValidatorError extends HttpError {
    errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super(400, 'Bad Request');

        this.errors = errors;
    }
}
