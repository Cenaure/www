import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import PageNotFound from '../pages/PageNotFound';
import { Context } from '../main.jsx';

const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth === true && user._user.role === 'ADMIN' && adminRoutes.map(({path, element: Component}) =>
                <Route key={path} path={path} element={<Component />}/>
            )}
            {user.isAuth === true && authRoutes.map(({path, element: Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({path, element: Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};
export default AppRouter;
