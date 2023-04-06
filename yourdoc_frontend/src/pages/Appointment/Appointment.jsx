import React, { useContext, useState } from 'react';
import './Appointment.css';
import { Navbar } from '../../components/nav-bar';
import { TimeSlots } from './TImeSlots';
import { DaySelector } from './DaySelector';
import { DoctorCard } from './DoctorCard';
import { DateTime } from 'luxon';
import { useGetAvailability } from '../../hooks/useGetAvailability';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDoctor } from '../../hooks/useGetDoctor';
import { useAppointment } from '../../hooks/useAppointment';
import { ToastContext } from '../../contexts/contexts';
import { Overlay } from '../../components/Overlay';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

export function Appointment() {
  const { doctorId } = useParams();
  const { availableSlots } = useGetAvailability(doctorId);
  const { doctor: { name, specialization } = {} } = useGetDoctor(doctorId);
  const { setAppointment, loadingState } = useAppointment(doctorId);
  const { showToastFor5s } = useContext(ToastContext);
  const [luxSelectedDay, setLuxSelectedDay] = useState(() => DateTime.now());
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [cookie] = useCookies(["session"]);
  const navigate = useNavigate();
  let currUserPatientId;

  try {
    currUserPatientId = jwtDecode(cookie.session).id;
  } catch { }

  const handleSetSelectedDay = (day) => {
    setLuxSelectedDay(day);
    setSelectedTimes([]);
  }

  const handleBookNow = async () => {
    await setAppointment(doctorId, currUserPatientId, luxSelectedDay, selectedTimes);
    const toastText = "Appointment booked for " + luxSelectedDay.toFormat('dd-LL-yyyy ') + selectedTimes[0];
    showToastFor5s({ toastText });
    navigate('/');
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col xl:flex-row dark:bg-black bg-gray-100 p-6">
        <div className="flex-1 max-w-screen-sm mx-auto">
          <DoctorCard name={name} specialization={specialization} />
        </div>
        <div className="relative flex-1 w-full max-w-screen-sm mx-auto flex-wrap">
          {!availableSlots.length ? <Overlay /> : null}
          <div className="justify-center flex bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-x-scroll mx-auto py-4 px-2 md:mx-12">
            {/* <button type="button" className="btnArrow">←</button> */}
            <DaySelector luxSelectedDay={luxSelectedDay} setLuxSelectedDay={handleSetSelectedDay} />
            {/* <button type="button" className="btnArrow">→</button> */}
          </div>
          <TimeSlots selectedDay={luxSelectedDay?.toFormat('ccc')} availableSlots={availableSlots}
            setSelectedTimes={setSelectedTimes} selectedTimes={selectedTimes}
          />
          <button type="button" onClick={handleBookNow} className="btnTime" disabled={!selectedTimes.length || loadingState !== 'init'}>Book Now</button>
        </div>
      </div>
    </div>
  );
}
