import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
export default function Navbar() {
    const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
    const [isProfileDropDownMenu,setIsProfileDropDownMenu] = useState(false);
    const auth = useContext(AuthContext);
    const profileMenuRef = useRef(null);
    useEffect(() => {
        auth.getData();
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setIsProfileDropDownMenu(false);
            }
        }
        if (isProfileDropDownMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileDropDownMenu]);
    return (
        <div className="bg-green-600 border-b-1 border-neutral-700">
        <div className="flex justify-between items-center md:hidden">
            <div className='text-2xl p-3'>Books world</div>
            <div className='md:hidden'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setIsMobileDropdownVisible(!isMobileDropdownVisible)}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 m-3"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
            </svg>
            </div>
        </div>

        <div className={`${isMobileDropdownVisible ? 'flex' : 'hidden'} md:hidden flex-col`} id='mobile-dropdown'>
            <div className='p-2 hover:bg-green-900 hover:cursor-pointer'><a href="/">Home</a></div>
            <div className='p-2 hover:bg-green-900 hover:cursor-pointer'><a href="/Books?page=1&limit=10">Books List</a></div>
            {Object.keys(auth.userData).length > 0 ? (
            <>
                <div className="p-2">
                <hr className='text-gray-400' />
                </div>
                <a href="/profile"><div className='p-2 hover:bg-green-900 hover:cursor-pointer'>Profile</div></a>
                <a href="/logout"><div className='p-2 hover:bg-green-900 hover:cursor-pointer'>Logout</div></a>
            </>
            ) : (
            <>
                <div className='p-2'><a href="/register">Register</a></div>
                <div className='p-2'><a href="/login">Login</a></div>
            </>
            )}  
        </div>

        <div className="hidden md:flex justify-between items-center">
            <div className='text-2xl p-3'>Books world</div>
            <div className='flex gap-5'>
            <div><a href="/">Home</a></div>
            <div><a href="/Books?page=1&limit=10">Books List</a></div>
            </div>
            <div className='flex gap-5 p-3'>
            {Object.keys(auth.userData).length > 0 ? (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setIsProfileDropDownMenu(prev => !prev)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <div ref={profileMenuRef} className={`${isProfileDropDownMenu? 'fixed':'hidden'} z-10 w-30 mt-6 right-4`}>
                    <a href="/profile"><div className='p-2 hover:bg-green-900 hover:cursor-pointer bg-green-100'>Profile</div></a>
                    <a href="/logout"><div className='p-2 hover:bg-green-900 hover:cursor-pointer bg-green-100'>Logout</div></a>
                </div>
                </>
            ) : (
                <>
                <div className='p-2'><a href="/register">Register</a></div>
                <div className='p-2'><a href="/login">Login</a></div>
                </>
            )}
            </div>
        </div>
        </div>
    );
}
