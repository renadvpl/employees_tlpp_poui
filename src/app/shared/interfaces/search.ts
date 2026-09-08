export interface AdvancedSearchFields {
    ra_mat_ge?: string;
    ra_mat_le?: string;
    ra_cpf_ge?: string;
    ra_cpf_le?: string;
}

export interface SearchDisclaimers {
    label: string;
    property: string;
    value: string | Date;
}