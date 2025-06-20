import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BooksList from "./components/BooksList";
import SingleBook from "./components/SingleBook";
import Navbar from "./components/Navbar";
import Profile from "./components/users/Profile";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import AuthProvider from "./Auth/AuthProvider";
import LogOut from "./components/users/LogOut";
import ProtectedRoute from "./Auth/ProtectedRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar/>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/register" Component={Register} />
            <Route path="/login" Component={Login} />
            <Route element={<ProtectedRoute/>}>
              <Route path="/logout" Component={LogOut} />
              <Route path="/books" Component={BooksList} />
              <Route path="/books/:bookId" Component={SingleBook} />
              <Route path="/profile" Component={Profile} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;