export interface ISignUp {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    country : string;
    city : string;
    state : string;
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
export interface ISignUpReducer {
    countries : ICountry[];
    states : IState[];
    cities : ICity[]
}