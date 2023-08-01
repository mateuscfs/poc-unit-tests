export interface IndexDefinition {
    Index: {
        properties: {
            id: {
                example: string;
            };
            name: {
                example: string;
            };
            active: {
                example: boolean;
            };
            array: {
                example: string[];
            };
        };
    };
}

export interface IndexCreateDefinition {
    IndexCreate: {
        properties: {
            name: {
                example: string;
            };
            number: {
                example: number;
            };
            active: {
                example: boolean;
            };
            array: {
                example: string[];
            };
        };
    };
}

export interface IndexUpdateDefinition {
    IndexUpdate: {
        properties: {
            id: {
                example: string;
            };
            number: {
                example: number;
            };
            name: {
                example: string;
            };
            active: {
                example: boolean;
            };
            array: {
                example: string[];
            };
        };
    };
}
