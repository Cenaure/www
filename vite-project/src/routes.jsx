import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Device from "./pages/Device";
import Main from "./pages/Main";
import AboutUs from "./pages/AboutUs";
import Types from "./pages/Types";
import Contacts from "./pages/Contacts";
import { adminRoute, basketRoute, mainRoute, deviceRoute, aboutUsRoute, typesRoute, contactsRoute, acountRoute } from "./utils/consts";
import Acount from "./pages/Acount";

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