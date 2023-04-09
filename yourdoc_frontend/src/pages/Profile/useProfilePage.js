import { useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useCookies } from "react-cookie";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { useAppointment } from "../../hooks/useAppointment";
import { ToastContext } from "../../contexts/contexts";

export function useProfilePage() {
  const { getAppointmentsByPatientId, deleteAppointment } = useAppointment();
  const { showToastFor5s } = useContext(ToastContext);
  const [listData, setListData] = useState();
  const [cookie] = useCookies(["session"]);
  const navigate = useNavigate();
  let user;
  try {
    user = jwtDecode(cookie.session);
  } catch { }

  useEffect(() => {
    if (!user?.type) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    a();
  }, [])

  const a = async () => {
    const patientAppointments = await getAppointmentsByPatientId(user.id);
    const listData = patientAppointments.map(pa => {
      const rightText = DateTime.fromISO(pa.datetime).toFormat('dd-LL-yyyy hh:mm a')
      return ({
        aId: pa.aID,
        title: pa.name,
        subTitle: pa.specialization,
        rightText,
        onItemClick: async () => {
          const delAppointment = window.confirm('Do you want to delete appointment on ' + rightText + '?');
          if (delAppointment) {
            await deleteAppointment(pa.aId);
            showToastFor5s({ toastText: 'Successfully deleted the appointment of ' + rightText + '.', toastTitle: 'Appointment deleted!', toastType: 'success' });
            setListData(listData.filter(l => l.aId !== pa.aId));
          }
        }
      })
    }
    )
    setListData(listData?.length ? listData : []);
  };

  return { user, listData }
}