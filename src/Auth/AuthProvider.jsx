import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
export const AuthContext = createContext({
    userData: {},
    logOut: () => {},
    getData: () => {}
});
export default function AuthProvider({ children }) {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const getData = () => {
        UserService.getUserData().then((res)=>{
            setUserData({
                firstName:res.data.firstName,
                lastName:res.data.lastName,
                userName:res.data.userName,
                email:res.data.email,
                lastLogIn:res.data.lastLogIn
            });
        }).catch(() => {
            setUserData({});
        })
    };

    useEffect(() => {
        getData();
    }, []);
    const logOut = async () => {
        UserService.logOut().then((res)=>{
            setUserData({});
        }).finally(()=>{
            navigate("/login");
        });
    };
    return (
        <AuthContext.Provider value={{ userData, logOut, getData }}>
            {children}
        </AuthContext.Provider>
    );
}
