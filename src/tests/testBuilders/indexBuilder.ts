import { IndexInterface } from '../../interfaces/index';

export class IndexBuilder {
    private index: any;

    constructor() {
        this.index = {};
    }

    public withId(id: string): IndexBuilder {
        this.index.id = id;
        return this;
    }

    public withName(name: string | boolean): IndexBuilder {
        this.index.name = name;
        return this;
    }

    public withNumber(number: number): IndexBuilder {
        this.index.number = number;
        return this;
    }

    public withActive(active: boolean): IndexBuilder {
        this.index.active = active;
        return this;
    }

    public withArray(array: string[]): IndexBuilder {
        this.index.array = array;
        return this;
    }

    public build(): IndexInterface {
        return this.index;
    }
}
