export interface IUser {
    username: string;
    email: string;
    country : string;
    _id : string
}


export interface IHomeReducer {
    users : IUser[]
}

export interface IGetUserParams {
    search : string | null;
    sortBy : string | null;
    sortOrder : string;
    page : number;
    limit : number;
    country : null | string;
    city : null | string;
    state : null | string;
}