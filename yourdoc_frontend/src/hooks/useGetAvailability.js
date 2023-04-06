import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";

export function useGetAvailability(doctorUserId) {
  const [availableSlots, setAvailableSlots] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await fetch(API_BASE_URL + `/availability?doctor_id=${doctorUserId}`).then(j => j.json())
      setAvailableSlots(data);
    })()
  }, [doctorUserId]);

  return { availableSlots };
}