export interface IDataTable {
    data : {
        api : string,
        filters : [],
        sorts : []
    };
    header : {
        fields : [],
        labelFields ?: {}
    }
}