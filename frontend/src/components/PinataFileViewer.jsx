import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PinataFileViewer = ({ fileUrl1 }) => {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(fileUrl1, {
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
  }, [fileUrl1]);

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
