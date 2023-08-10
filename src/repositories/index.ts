import {
    IndexInterface,
    UpdateIndexInterface,
    CreateIndexInterface,
} from '../interfaces';

export const create = async (data: CreateIndexInterface): Promise<string> => {
    const repository = { create: () => 'created' };
    return repository.create();
};

export const getById = async (id: string): Promise<string> => {
    const repository = { findOne: (id: string) => id };
    return repository.findOne(id);
};

export const updateById = async (
    id: string,
    data: Record<string, unknown>,
): Promise<UpdateIndexInterface> => {
    const repository = {
        update: (id: string, data: any) => {
            return { id, ...data };
        },
    };
    return repository.update(id, data);
};

export const deleteById = async (id: string): Promise<string> => {
    const repository = { delete: (id: string) => 'deleted' };
    return repository.delete(id);
};

export const getAll = async (): Promise<IndexInterface[]> => {
    const repository = { find: () => [{ name: 'getAll' }] };
    return repository.find();
};
