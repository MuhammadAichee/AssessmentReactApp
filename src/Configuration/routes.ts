import Login from "Features/Auth/Login/login.index";
import SignUp from "Features/Auth/SignUp/signUp.index";
import Home from "Features/Home/home.index";
import MainLayout from "Layout/layout.index";

export interface IRoutes {
	path: string;
	component: any;
	layout?: any;
}

export const PrivateRoutes : IRoutes[] = [
    {
        path:"/Home",
        component: Home,
        layout : MainLayout
    }
]
export  const PublicRoutes : IRoutes[] = [
    {
        path:"/",
        component: Login
    },
    {
        path:"/signup",
        component: SignUp
    },

]
