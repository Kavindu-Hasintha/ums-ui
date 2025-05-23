import { CiUser } from "react-icons/ci";
import useAuth from "../../hooks/useAuth.hook.ts";
import Button from "../general/Button.tsx";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths.ts";

const Sidebar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleClick = (url: string) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        navigate(url);
    };

    return (
        <div className='shrink-0 bg-[#754eb4] w-60 p-2 min-h-[calc(100vh-48px)] flex flex-col items-stretch gap-8'>
            <div className='self-center flex flex-col items-center'>
                <CiUser className='w-10 h-10 text-white' />
                <h4 className='text-white'>
                    {user?.firstName} {user?.lastName}
                </h4>
            </div>
            <Button
                variant='secondary'
                type='button'
                label='Users Management'
                onClick={() => handleClick(PATH_DASHBOARD.usersManagement)}
            />
            <Button
                variant='secondary'
                type='button'
                label='Send Message'
                onClick={() => handleClick(PATH_DASHBOARD.sendMessage)}
            />
            <Button
                variant='secondary'
                type='button'
                label='Inbox'
                onClick={() => handleClick(PATH_DASHBOARD.inbox)}
            />
            <Button
                variant='secondary'
                type='button'
                label='All Messages'
                onClick={() => handleClick(PATH_DASHBOARD.allMessages)}
            />
            <Button
                variant='secondary'
                type='button'
                label='All Logs'
                onClick={() => handleClick(PATH_DASHBOARD.systemLogs)}
            />
            <Button
                variant='secondary'
                type='button'
                label='My Logs'
                onClick={() => handleClick(PATH_DASHBOARD.myLogs)}
            />
            <hr />
            <Button
                variant='secondary'
                type='button'
                label='Owner Page'
                onClick={() => handleClick(PATH_DASHBOARD.owner)}
            />
            <Button
                variant='secondary'
                type='button'
                label='Admin Page'
                onClick={() => handleClick(PATH_DASHBOARD.admin)}
            />
            <Button
                variant='secondary'
                type='button'
                label='Manager Page'
                onClick={() => handleClick(PATH_DASHBOARD.manager)}
            />
            <Button
                variant='secondary'
                type='button'
                label='User Page'
                onClick={() => handleClick(PATH_DASHBOARD.user)}
            />
        </div>
    );
}

export default Sidebar;