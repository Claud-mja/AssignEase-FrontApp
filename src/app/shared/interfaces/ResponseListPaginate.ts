export interface ResponseListPaginate {
    docs : Object[];
    totalDocs : number;
    totalPages : number;
    nextPage : number;
    prevPage : number;
    hasNextPage : boolean;
    hasPrevPage : boolean;
}
