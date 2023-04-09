import { useContext, useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import { ToastContext } from "../contexts/contexts";

export function useFileUpload() {
  const [loadingState, setLoadingState] = useState('isInit');
  const { showToastFor5s } = useContext(ToastContext)

  const uploadFileInfo = async (bodyObj) => {
    setLoadingState('isLoading');
    try {
      const response = await fetch(API_BASE_URL + '/upload', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(bodyObj)
      }).then(j => j.json());
      setLoadingState('isSuccess');
      return response;
    } catch (error) {
      showToastFor5s({ toastText: 'Upload Failed!', toastTitle: 'Failed', toastType: 'danger' })
      return console.error(error);
    } finally {
      setLoadingState('init');
    }
  }

  async function formDataUpload(params) {
    const baseUrl = "https://api.upload.io";
    const path = `/v2/accounts/${params.accountId}/uploads/form_data`;
    const entries = obj => Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
    const query = entries(params.querystring ?? {})
      .flatMap(([k, v]) => Array.isArray(v) ? v.map(v2 => [k, v2]) : [[k, v]])
      .map(kv => kv.join("=")).join("&");
    const formData = new FormData();
    formData.append("file", params.requestBody, params.originalFileName)
    const response = await fetch(`${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`, {
      method: "POST",
      body: formData,
      headers: Object.fromEntries(entries({
        "Authorization": `Bearer ${params.apiKey}`,
        "X-Upload-Metadata": JSON.stringify(params.metadata)
      }))
    });
    const result = await response.json();
    if (Math.floor(response.status / 100) !== 2)
      throw new Error(`Upload API Error: ${JSON.stringify(result)}`);
    return result;
  }

  return { uploadFileInfo, formDataUpload, loadingState }
}