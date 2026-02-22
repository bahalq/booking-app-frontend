import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import "./styles.css";
import Logout from "./Components/Logout";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import NotFound from "./Components/NotFound";
import { useTranslation } from "react-i18next";
import AddGround from "./Components/AddGround";
import ViewAllGrounds from "./Components/viewAllGrounds";
import ProtectedRoute from "./Components/ProtectedRoute";
import BookingForm from "./Components/BookingForm";
import GroundDetails from "./Components/GroundDetails";
import GroundsList from "./Components/GroundsList";
import ManageTerrains from "./Components/Admin/ManageTerrains";

function App() {
  const [isLogin, setIslogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [i18n.language]);

  useEffect(() => {
    import("./services/api").then(({ api }) => {
      api.checkAuth()
        .then((data) => {
          if (data.authenticated) {
            setIslogin(true);
            setRole(data.user.role);
          }
        })
        .finally(() => setLoading(false));
    });
  }, []);
  if (loading) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <div className="animate-spin border-2 rounded-full h-10 w-10 border-t-0 border-white"></div>
      </div>
    );
  }
  return (
    <>
      <Header
        role={role}
        isLogin={isLogin}
        setIslogin={setIslogin}
        setRole={setRole}
      />
      <Routes>
        {/* Admin routes */}
        <Route
          path="/admin/grounds/add"
          element={
            <ProtectedRoute isLogin={isLogin} role={role}>
              <AddGround />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/grounds/:id/terrains"
          element={
            <ProtectedRoute isLogin={isLogin} role={role}>
              <ManageTerrains />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/grounds"
          element={
            <ProtectedRoute isLogin={isLogin} role={role}>
              <ViewAllGrounds />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/grounds" element={<GroundsList />} />
        <Route path="/grounds/:id" element={<GroundDetails />} />
        <Route path="/" element={<Home isLogin={isLogin} role={role} />} />

        <Route
          path="/login"
          element={
            isLogin ? (
              <Navigate to="/" />
            ) : (
              <Login setIslogin={setIslogin} setRole={setRole} />
            )
          }
        />

        <Route
          path="/signup"
          element={isLogin ? <Navigate to="/" /> : <Signup />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
