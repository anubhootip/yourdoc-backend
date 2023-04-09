import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import OurDoctors from '../OurDoctors';
import Footer from '../Footer';
import HomeQuote from '../HomeQuote';
import Mission from '../Mission';
import { Navbar } from '../../components/nav-bar';
import { HomeImage } from '../../components/HomeImage';

function Home() {
  const [cookie] = useCookies(["session"]);
  const navigate = useNavigate();
  let user;
  try {
    user = jwtDecode(cookie.session);
  } catch { }
  useEffect(() => {
    if (user?.type && user.type !== 'admin') {
      navigate(user.type === 'doctor' ? '/profile/doctor' : '/profile');
    } else if (user?.type === 'admin') {
      navigate('/admindashboard')
    }
  }, [user?.type]);
  return (
    <div className="bg-dark">
      <Navbar />
      <HomeImage />
      <Mission />
      <OurDoctors />
      <HomeQuote />
      <Footer />

    </div>
  );
}


export default Home;