import { useEffect, useState } from 'react';
import { usePrescription } from '../../hooks/usePrescription';
import { Overlay } from '../Overlay';
import { useFileUpload } from '../../hooks/useFileUpload';
import { UPLOAD_ACCOUNT_ID, UPLOAD_API_KEY } from '../../utils/constants';

export function PrescriptionPage({ patientId, uploadedByUserId }) {
  const { getPrescriptionByPatientId, loadingState } = usePrescription();
  const { uploadFileInfo, formDataUpload, loadingState: uploadLoadingState } = useFileUpload();
  const [prescriptionFiles, setPrescriptionFiles] = useState();


  useEffect(() => {
    if (patientId) {
      getPrescriptionByPatientId(patientId).then(d => setPrescriptionFiles(d));
    }
  }, [patientId]);


  const handleFileUpload = (e) => {
    e.preventDefault();

    formDataUpload({
      accountId: UPLOAD_ACCOUNT_ID,
      apiKey: UPLOAD_API_KEY,
      requestBody: e.target.file.files[0],
      querystring: {
        folderPath: "/uploads",
      }
    }).then(
      response => {
        console.log(`Success: ${JSON.stringify(response)}`)
        const { fileUrl, filePath } = response.files[0];
        const body = { uploaded_by: uploadedByUserId, uploaded_for: patientId, file_url: fileUrl, file_path: filePath }
        uploadFileInfo(body);
      },
      error => console.error(error)
    );

  };

  return <div className='relative'>
    {loadingState === 'isLoading' ? <Overlay /> : null}
    {prescriptionFiles?.map(pf => <div key={pf.file_name}>
      <a href={pf.file_url} className='link-primary underline'>{pf.file_path.split('/')[2]}</a>
    </div>)}
    <form onSubmit={handleFileUpload}>
      <div className='relative'>
        {uploadLoadingState === 'isLoading' ? <Overlay /> : null}
        <input type="file" id="file" name="file" />
        <button className="ml-2 inline-block rounded bg-blue-600 px-4 pt-2 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-600-700"
          type="submit">Upload</button>
      </div>
    </form>
  </div>

}