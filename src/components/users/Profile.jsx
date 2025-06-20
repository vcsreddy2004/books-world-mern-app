import { useContext, useEffect } from "react"
import {AuthContext} from "./../../Auth/AuthProvider";
export default function Profile() {
  const auth = useContext(AuthContext);
  useEffect(()=>{
    auth.getData();
  },[auth]);  
  return (
    <>
      <div className="w-1/2 flex items-center mt-5 m-auto shadow-xl">
        <div className="w-1/4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" class="text-sm fill-none stroke-green-800">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div> 
        <div className="bg-white w-1/2">
          <div className="m-1 text-3xl">
            {auth.userData.firstName + auth.userData.lastName}
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-center m-auto shadow-xl">
        <div className="p-5 w-1/2 text-end">
          <div>
            Email:
          </div>
          <div>
            UserName
          </div>
        </div>
        <div className="w-1/2">
          <div>
            {auth.userData.email}
          </div>
          <div>
           {auth.userData.userName}
          </div>
        </div>
      </div>
    </>
  )
}
