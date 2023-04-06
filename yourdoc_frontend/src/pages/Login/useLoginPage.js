import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useUser } from "../../hooks/useUser";
import { ToastContext } from "../../contexts/contexts";

export const Fields = [
  { type: 'email', placeholder: 'Email address', id: 'email', isRequired: true },
  { type: 'password', placeholder: 'Password', id: 'password', isRequired: true },
];

export function useLoginPage(type) {
  const [loginState, setLoginState] = useState('isInit');
  const { getPatientAccessByEmailNPassword, getDoctorAccessByEmailNPassword } = useUser();
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const { showToastFor5s } = useContext(ToastContext);

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const formValues = Fields.reduce((p, c) => ({ ...p, [c.id]: e.target[c.id].value }), {});
    setLoginState('isLoading');
    let response;
    if (type === 'doctor') {
      response = await getDoctorAccessByEmailNPassword(formValues.email, formValues.password);
    } else {
      response = await getPatientAccessByEmailNPassword(formValues.email, formValues.password);
    }
    const { accessToken, message } = response;
    if (message === 'success' || accessToken?.length > 10) {
      setCookie("session", accessToken, { path: "/" });
      setLoginState('isSuccess');
      navigate(type ? '/profile/' + type : '/profile');
    } else {
      setLoginState('isInit');
      showToastFor5s({ toastText: "Invalid Login", toastType: 'danger' });
    }
  }

  return { onSubmitLogin, loginState }
}