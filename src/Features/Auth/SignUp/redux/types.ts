export interface ISignUp {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    country : string;
}

export interface ICountry {
    name : string;
    _id : string;
}
export interface ISignUpReducer {
    countries : ICountry[]
}