import Login from "Features/Auth/Login/login.index";

export interface IRoutes {
	path: string;
	component: any;
	layout?: any;
}

export const PrivateRoutes : IRoutes[] = [
    {
        path:"/Home",
        component: null,
        layout : null
    }
]
export  const PublicRoutes : IRoutes[] = [
    {
        path:"/",
        component: Login
    }
]
