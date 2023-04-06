import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";

export function useGetDoctor(doctorUserId) {
  const [doctor, setDoctor] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await fetch(API_BASE_URL + `/doctor/${doctorUserId}`).then(j => j.json())
      setDoctor(data);
    })()
  }, [doctorUserId]);

  return { doctor };
}