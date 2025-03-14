import useAuth from "../../hooks/useAuth.hook.ts";
import Button from "../general/Button.tsx";
import { AiOutlineHome } from "react-icons/ai";
import { FiLock, FiUnlock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/paths.ts";

const Header = () => {
    const { isAuthLoading, isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const userRolesLabelCreator = () => {
        if (user) {
            let result = '';
            user.roles.forEach((role, index) => {
                result += role;
                if (index < user.roles.length - 1) {
                    result += ', ';
                }
            });
            return result;
        }
        return '--';
    };

    return <div>Header</div>;
};

export default Header;