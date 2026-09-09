export interface SRAFields {
    SRA: {
        fields: Field[],
        folders: any[],
        groups: any[]
    }
}

export interface Field {
    field: string;
    order: string;
    title: string;
    description: string;
    picture: string;
    combobox: string[];
    virtual: boolean;
    group: string;
    folder: string;
    protectedData: boolean;
    canChange: boolean;
    userField: boolean;
    browse: boolean;
    required: boolean;
    type: string;
    size: number;
    decimal: number;
}