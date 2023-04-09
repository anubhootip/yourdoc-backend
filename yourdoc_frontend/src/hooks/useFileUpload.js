import { useContext, useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import { ToastContext } from "../contexts/contexts";

export function useFileUpload() {
  const [loadingState, setLoadingState] = useState('isInit');
  const { showToastFor5s } = useContext(ToastContext)

  const uploadFile = async (formData) => {
    setLoadingState('isLoading');
    try {
      const response = await fetch(API_BASE_URL + '/upload', {
        method: 'POST',
        body: formData
      }).then(j => j.json());
      setLoadingState('isSuccess');
      return response;
    } catch (error) {
      setLoadingState('isFailed');
      showToastFor5s({ toastText: 'Upload Failed!', toastTitle: 'Failed', toastType: 'danger' })
      return console.error(error);
    }
  }

  return { uploadFile, loadingState }
}