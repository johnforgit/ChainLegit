import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PinataFileViewer = ({ fileUrl }) => {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get("https://yellow-electric-egret-510.mypinata.cloud/ipfs/QmXdeWga2HXr7caKSMCdA6XkGtX2vEh6pgH98uZdAqHKVT", {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/pdf',
          },
        });
        const fileBlob = new Blob([response.data], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(fileBlob);
        setFileData(fileUrl);
        setLoading(false);
      } catch (error) {
        setError('Error fetching file. Please try again.');
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileUrl]);

  return (
    <div className='mt-10'>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {fileData && (
        <div>
          <h2>PDF Viewer</h2>
          <embed
            src={fileData}
            type="application/pdf"
            width="100%"
            height="900"
          />
        </div>
      )}
    </div>
  );
};

export default PinataFileViewer;
