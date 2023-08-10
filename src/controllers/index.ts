import { HttpError } from '../utils/errors';
import * as repositories from '../repositories';
import {
    CreateIndexInterface,
    UpdateIndexInterface,
    IndexGetAllRepositoryInterface,
} from '../interfaces/index';

export const create = async (data: CreateIndexInterface): Promise<string> => {
    try {
        const result = await repositories.create(data);
        return result;
    } catch (error: any) {
        throw new HttpError(error.statusCode || 500, error.message);
    }
};

export const remove = async (id: string): Promise<{ message: 'Deleted' }> => {
    try {
        await getById(id);
        await repositories.deleteById(id);

        return { message: 'Deleted' };
    } catch (error: any) {
        throw new HttpError(error.statusCode || 500, error.message);
    }
};

export const update = async (
    data: UpdateIndexInterface,
): Promise<UpdateIndexInterface> => {
    try {
        await getById(data.id);

        const { array, number, active, name } = data;
        const result = await repositories.updateById(data.id, {
            array,
            number,
            active,
            name,
        });

        return result;
    } catch (error: any) {
        throw new HttpError(error.statusCode || 500, error.message);
    }
};

export const getAll = async (): Promise<IndexGetAllRepositoryInterface> => {
    try {
        const result = await repositories.getAll();
        if (result.length === 0) {
            throw new HttpError(404, 'No data Found');
        }

        return { data: result };
    } catch (error: any) {
        throw new HttpError(error.statusCode || 500, error.message);
    }
};

export const getById = async (actionId: string): Promise<string> => {
    const result = await repositories.getById(actionId);
    if (!result) {
        throw new HttpError(404, 'Data Not Found');
    }

    return result;
};
