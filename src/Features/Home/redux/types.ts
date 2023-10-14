export interface IUser {
    username: string;
    email: string;
    country : ICountry;
    _id : string,
    state :IState;
    city : ICity;
}
export interface IEditUserPayload {
    username: string;
    email: string;
    country : any;
    state :any;
    city : any;
    id : string
}
export interface ICountry {
    name : string;
    _id : string;
}
export interface IState {
    name : string;
    country : string;
    _id : string;
}
export interface ICity {
    name : string;
    country : string;
    state : string;
    _id : string;
}

export interface IHomeReducer {
    users : IUser[]
    selectedUser : IUser;
    isModelOpen : boolean;
    countries : ICountry[];
    states : IState[];
    cities : ICity[]
    count : number;
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