import { API_BASE_URL } from "../utils/constants";

export function useAvailablitiy() {
  const setAvailability = async (doctorAvailabilities) => {
    const body = JSON.stringify(doctorAvailabilities);

    await fetch(API_BASE_URL + '/availability/multiple', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'put',
      body
    }).then(j => j.json());
  }

  const getAvailability = async (doctorUserId) => {
    return await fetch(API_BASE_URL + `/availability?doctor_id=${doctorUserId}`).then(j => j.json())
  }

  return { setAvailability, getAvailability }
}