import { API_BASE_URL } from "../utils/constants";

export function useUser() {
  const getUserById = async (userId) => {
    const { data } = await fetch(API_BASE_URL + `/user/${userId}`).then(j => j.json())

    return data;
  }

  const getUserByIdNType = async (userId, type) => {
    const { data } = await fetch(API_BASE_URL + `/user/bytype?userId=${userId}&type=${type}`).then(j => j.json())

    return data;
  }

  const getPatientAccessByEmailNPassword = async (email, password) => {
    const body = JSON.stringify({ email, password });

    const { data, message } = await fetch(API_BASE_URL + '/patientlogin', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body
    }).then(j => j.json());

    return { accessToken: data, message };
  }

  const getDoctorAccessByEmailNPassword = async (email, password) => {
    const body = JSON.stringify({ email, password });

    const { data, message } = await fetch(API_BASE_URL + '/doctorlogin', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body
    }).then(j => j.json());

    return { accessToken: data, message };
  }


  const setUserPatient = async (user) => {
    // to send email remove no_email: true and just stringify user
    const body = JSON.stringify({ ...user, no_email: true });
    await fetch(API_BASE_URL + '/patientregistration', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body
    }).then(j => j.json());
  }

  const setUserDoctor = async (user) => {
    // to send email remove no_email: true and just stringify user
    const body = JSON.stringify({ ...user, no_email: true });
    await fetch(API_BASE_URL + '/doctorregistration', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body
    }).then(j => j.json());
  }

  return {
    getUserById, getUserByIdNType, setUserPatient, setUserDoctor,
    getPatientAccessByEmailNPassword, getDoctorAccessByEmailNPassword
  }
}