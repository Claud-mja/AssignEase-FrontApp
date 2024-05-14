export interface HeaderConfig {
    fields : FieldValue[],
    labels ?: { [key : string] : string},
    filters : FilterValue[],
    sorts : SortValue[]
}

export interface FieldValue {
    name : string,
    type : string
}

interface FilterValue {
    field : string,
    value : string
}

interface SortValue {
    field : string,
    value : number
}
