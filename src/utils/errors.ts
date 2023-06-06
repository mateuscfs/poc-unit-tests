export class HttpError extends Error {
    code: number;

    errors?: any[];

    constructor(code: number, message: string, errors?: any[]) {
        super(message);
        this.errors = errors;
        this.code = code;
    }
}
