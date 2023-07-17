import { IndexInterface } from '../../interfaces/index';

export const buildProfile = (name: IndexInterface, id: string): IndexInterface => {
    return {
        ...name,
        id,
    };
};
