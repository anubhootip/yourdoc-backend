import React, { useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import './index.css';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import { Appointment } from './pages/Appointment/Appointment';
import { Profile } from './pages/Profile/Profile';
import { ThemeContext, ToastContext, ToastDefaultValue } from './contexts/contexts';
import { Toast } from './components/Toast/Toast';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { AdminDashboard } from './pages/AdminDashboard/AdminDashboard';
import { UserProfile } from './pages/AdminDashboard/UserProfile';
import { DoctorProfile } from './pages/Doctor/DoctorProfile';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/login/doctor", element: <Login type="doctor" /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signup/doctor", element: <SignUp type="doctor" /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/contact", element: <Contact /> },
  { path: "/appointment/:doctorId", element: <Appointment /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/doctor", element: <DoctorProfile /> },
  { path: "/admindashboard", element: <AdminDashboard /> },
  { path: "/admindashboard/userProfile/:id", element: <UserProfile /> },
]);

export function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [toastState, setToastState] = useState(ToastDefaultValue);
  const showToastFor5s = ({ toastText, toastTitle, toastType }) => {
    setToastState(s => ({ toastText, toastTitle, toastType, isShowToast: true }));
    setTimeout(() => setToastState(s => ({ ...s, isShowToast: false })), 5000);
  };
  const toggleIsLightTheme = () => setIsLightTheme((s) => !s);
  const { toastText, toastTitle, toastType, isShowToast } = toastState;
  const themeContextDefaultValue = useMemo(() => ({ isLightTheme, toggleIsLightTheme }), [isLightTheme]);
  const toastDefaultValue = useMemo(() => ({ ...toastState, showToastFor5s }), [toastState]);

  return <ThemeContext.Provider value={themeContextDefaultValue}>
    <CookiesProvider>
      <ToastContext.Provider value={toastDefaultValue}>
        <div className={isLightTheme ? '' : 'dark'}>
          <RouterProvider router={router} />
          {isShowToast
            ? <Toast text={toastText} title={toastTitle} type={toastType} />
            : null
          }
        </div>
      </ToastContext.Provider>
    </CookiesProvider>
  </ThemeContext.Provider>
}