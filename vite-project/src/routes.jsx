import Admin from "./pages/Main/Admin";
import Basket from "./pages/Targeted/Basket";
import Device from "./pages/Targeted/Device";
import Main from "./pages/Main/Main";
import AboutUs from "./pages/Main/AboutUs";
import Types from "./pages/Main/Types";
import Contacts from "./pages/Main/Contacts";
import { adminRoute, basketRoute, mainRoute, deviceRoute, aboutUsRoute, typesRoute, contactsRoute, acountRoute } from "./utils/consts";
import Acount from "./pages/Targeted/Acount";

export const authRoutes = [
    {
        path: adminRoute,
        element: Admin
    },
    {
        path: basketRoute,
        element: Basket
    },
    {
        path: acountRoute,
        element: Acount
    }
]

export const publicRoutes = [
    {
        path: mainRoute,
        element: Main,
    },
    {
        path: deviceRoute + '/:id', 
        element: Device
    },
    {
        path: aboutUsRoute, 
        element: AboutUs
    },
    {
        path: typesRoute, 
        element: Types
    },
    {
        path: contactsRoute,
        element: Contacts
    }
]