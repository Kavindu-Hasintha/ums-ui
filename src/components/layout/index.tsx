import useAuth from "../../hooks/useAuth.hook.ts";
import Header from "./Header.tsx";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";

const Layout = () => {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();

    console.log(pathname);

    const sideBarRenderer = () => {
        if (isAuthenticated && pathname.toLowerCase().startsWith('/dashboard')) {
            return <Sidebar />;
        }
        return null;
    };

    return (
        <div>
            <Header />

            {/* Using Outlet, We render all routes  that are inside of this layout */}
            <div className='flex'>
                {sideBarRenderer()}
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;