export interface IndexInterface {
    id?: string;
    name?: string;
    active?: boolean;
    array?: string[];
}

export interface CreateIndexInterface {
    name: string;
    number: number;
    array: string[];
    active: boolean;
}

export interface UpdateIndexInterface {
    id: string;
    name: string;
    number: number;
    array: string[];
    active: boolean;
}

export interface IndexGetAllRepositoryInterface {
    data: CreateIndexInterface[];
}
