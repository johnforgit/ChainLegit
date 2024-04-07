import React, { useState } from 'react';
import axios from 'axios';

const PinataUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const uploadToPinata = async () => {
    if (!file) {
      setUploadError('Please select a file to upload.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'pinata_api_key': 'c4d6137919ad7970b733',
          'pinata_secret_api_key': 'e1eff279db3605e905cb233ac6be3ca7d428c82802712b2265711d17af59a565'
        }
      });

      console.log('Upload successful:', response.data);
      window.alert("Upload successful")

      setUploading(false);
      setFile(null);
      setUploadError('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      setUploadError('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      {/* <h2>Pinata File Uploader</h2> */}
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-xl  ml-14 font-semibold">Pinata File Uploader</span>
  </div>
  <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
 
</label>
      {/* <input type="file" onChange={handleFileChange} /> */}
      <div
        className="drop-zone"
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* <p>Drag & drop your file here</p> */}
      </div>
      {uploading && <p>Uploading...</p>}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      <button className='btn btn-outline btn-primary mt-5 ml-20' onClick={uploadToPinata} disabled={uploading}>
        Upload to Pinata
      </button>
    </div>
  );
};

export default PinataUploader;
