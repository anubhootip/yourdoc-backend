import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useCookies } from "react-cookie";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { useAppointment } from "../../hooks/useAppointment";

export function useProfilePage() {
  const { getAppointmentsByPatientId } = useAppointment();
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
    (async () => {
      const patientAppointments = await getAppointmentsByPatientId(user.id);
      const listData = patientAppointments.map(pa => ({
        title: pa.name, subTitle: pa.specialization,
        rightText: DateTime.fromISO(pa.datetime).toFormat('dd-LL-yyyy hh:MM'),
        onItemClick: () => navigate('/appointment/' + pa.doctor_id)
      }))
      setListData(listData?.length ? listData : []);
    })();
  }, [])

  return { user, listData }
}