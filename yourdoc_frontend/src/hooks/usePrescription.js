import { useState } from 'react';
import { API_BASE_URL } from "../utils/constants";

export function usePrescription() {
  const [loadingState, setLoadingState] = useState('isInit');
  const getPrescriptionByPatientId = async (patientId) => {
    setLoadingState('isLoading');
    const { data } = await fetch(API_BASE_URL + `/prescription?patientId=${patientId}`).then(j => j.json())
    setLoadingState('isSuccess');
    return data;
  }

  return { getPrescriptionByPatientId, loadingState }
}