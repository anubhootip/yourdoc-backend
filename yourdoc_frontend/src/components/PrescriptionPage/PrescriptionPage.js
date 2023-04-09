import { useEffect, useState } from 'react';
import { usePrescription } from '../../hooks/usePrescription';
import { Overlay } from '../Overlay';
import { useFileUpload } from '../../hooks/useFileUpload';
import { API_BASE_URL } from '../../utils/constants';

export function PrescriptionPage({ patientId, uploadedByUserId }) {
  const { getPrescriptionByPatientId, loadingState } = usePrescription();
  const { uploadFile, loadingState: uploadLoadingState } = useFileUpload();
  const [prescriptionFiles, setPrescriptionFiles] = useState();


  useEffect(() => {
    if (patientId) {
      getPrescriptionByPatientId(patientId).then(d => setPrescriptionFiles(d));
    }
  }, [patientId]);


  const handleFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);
    formData.append('uploaded_by', uploadedByUserId);
    formData.append('uploaded_for', patientId);

    uploadFile(formData);
  };

  return <div className='relative'>
    {loadingState === 'isLoading' ? <Overlay /> : null}
    {prescriptionFiles?.map(pf => <div><a href={`${API_BASE_URL}/upload?file=${pf.file_name}`}>{pf.original_name}</a></div>)}
    <form onSubmit={handleFileUpload}>
      <div className='relative'>
        {uploadLoadingState === 'isLoading' ? <Overlay /> : null}
        <input type="file" id="file" name="file" />
        <button type="submit">Upload</button>
      </div>
    </form>
  </div>

}