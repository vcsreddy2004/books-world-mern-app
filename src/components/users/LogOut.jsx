import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../Auth/AuthProvider';
import { useContext, useEffect } from 'react';

export default function LogOut() {
  const auth = useContext(AuthContext);
  const navigator = useNavigate();
  useEffect(() => {
    auth.logOut();
    navigator("/");
  }, [auth]);
  return (
    <div className="text-center mt-10 text-lg text-gray-600">Logging you out...</div>
  );

}