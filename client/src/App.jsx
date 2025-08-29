import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function App() {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-cover">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}
