import { useState } from "react";
import { API_BASE_URL } from "../utils/constants";

export function useAppointment() {
  const [loadingState, setLoadingState] = useState('init');

  const setAppointment = async (doctorId, patientId, luxSelectedDay, selectedTimes) => {
    const datetime = luxSelectedDay.toFormat('yyyy-LL-dd') + ' ' + selectedTimes[0];
    const body = JSON.stringify({ patient_id: patientId, doctor_id: doctorId, datetime });
    setLoadingState('isLoading');
    const result = await fetch(API_BASE_URL + '/appointment', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body
    }).then(j => {
      setLoadingState('isSuccess');
      return j.json();
    })
      .catch(() => setLoadingState('isFail'));

    return result;
  }

  const getAppointmentsByPatientId = async (patientId) => {
    const { data } = await fetch(API_BASE_URL + `/appointment?patient_id=${patientId}`).then(j => j.json())

    return data;
  }

  const getAppointmentsByDoctorId = async (patientId) => {
    const { data } = await fetch(API_BASE_URL + `/appointment?doctor_id=${patientId}`).then(j => j.json())

    return data;
  }

  return {
    setAppointment, loadingState, getAppointmentsByPatientId,
    getAppointmentsByDoctorId
  }
}