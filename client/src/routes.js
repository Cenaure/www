import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import Device from "./pages/Device";
import Main from "./pages/Main";
import AboutUs from "./pages/AboutUs";
import Types from "./pages/Types";
import Contacts from "./pages/Contacts";
import { adminRoute, basketRoute, mainRoute, loginRoute, registrationRoute, deviceRoute, aboutUsRoute, typesRoute, contactsRoute } from "./utils/consts";

export const authRoutes = [
    {
        path: adminRoute,
        element: Admin
    },
    {
        path: basketRoute,
        element: Basket
    }
]

export const publicRoutes = [
    {
        path: mainRoute,
        element: Main
    },
    {
        path: loginRoute,
        element: Auth
    },
    {
        path: registrationRoute,
        element: Auth
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