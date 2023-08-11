import { HttpError } from '../utils/errors';
import * as repositories from '../repositories';

export const create = async (data: Record<string, unknown>): Promise<any> => {
    try {
        const result = await repositories.create(data);
        return result;
    } catch (error: any) {
        throw new HttpError(error.statusCode || 500, error.message);
    }
};

export const remove = async (id: string): Promise<any> => {
    try {
        await getById(id);
        await repositories.deleteById(id);

        return { message: 'Deleted' };
    } catch (error: any) {
        throw new HttpError(error.statusCode || 500, error.message);
    }
};

export const update = async (data: any): Promise<any> => {
    try {
        await getById(data.id);

        const { name, description, title } = data;
        const result = await repositories.updateById(data.id, {
            name,
            description,
            title,
        });

        return result;
    } catch (error: any) {
        throw new HttpError(error.statusCode || 500, error.message);
    }
};

export const getAll = async (): Promise<any> => {
    try {
        const result = await repositories.getAll();
        if (result.length === 0) {
            throw new HttpError(404, 'No data Found');
        }

        return result;
    } catch (error: any) {
        throw new HttpError(error.statusCode || 500, error.message);
    }
};

export const getById = async (actionId: string): Promise<any> => {
    const result = await repositories.getById(actionId);
    if (!result) {
        throw new HttpError(404, 'Data Not Found');
    }

    return result;
};
