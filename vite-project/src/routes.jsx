import Admin from "./pages/Main/Admin";
import Basket from "./pages/Targeted/Basket";
import Device from "./pages/Targeted/Device";
import Main from "./pages/Main/Main";
import AboutUs from "./pages/Main/AboutUs";
import Types from "./pages/Main/Types";
import Contacts from "./pages/Main/Contacts";
import { adminRoute, basketRoute, mainRoute, deviceRoute, aboutUsRoute, typesRoute, contactsRoute, acountRoute, devicesRoute, searchRoute, checkoutRoute, checkoutSucceedRoute } from "./utils/consts";
import Acount from "./pages/Targeted/Acount";
import Devices from "./pages/Main/DevicesList";
import SearchResultsPage from "./pages/Targeted/SearchResult";
import CheckoutPage from "./pages/Targeted/checkoutPage";
import CheckoutSucceedPage from "./pages/Targeted/checkoutSucceedPage";

export const adminRoutes = [
    {
        path: adminRoute,
        element: Admin
    }
]

export const authRoutes = [
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
        path: searchRoute + '/:searchRequest',
        element: SearchResultsPage,
    },
    {
        path: checkoutRoute,
        element: CheckoutPage,
    },
    {
        path: checkoutSucceedRoute,
        element: CheckoutSucceedPage,
    },
    {
        path: deviceRoute + '/:id', 
        element: Device
    },
    {
        path: devicesRoute,
        element: Devices
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