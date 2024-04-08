import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi'
import NFT from '../abi/court.json';
import { Contract, BrowserProvider } from "ethers";
const PinataUploader = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [selectedCard, setSelectedCard] = useState(null);
  const [NFTContract, setNFTContract] = useState(null);
  const [registered , setRegistered] = useState(0);
  //const NFT_CONTRACT_ADDRESS = "0xb783a9df67548569399a1811120b70149a5bf1be";
  const NFT_CONTRACT_ADDRESS = "0x01ff8e5afaba8d220fd56e0f541629ba232db61c";
 
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [ipfsUrl , setIpfsUrl] = useState('');
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleFileDescriptionChange = (e) => {
    setFileDescription(e.target.value);
  };
  useEffect(() => {

    // Add event listener to handle clicks outside the form
    function initNFTContract () {
      console.log("my address:", address)
      const provider = new BrowserProvider(window.ethereum);
      provider.getSigner().then((signer) => {
        const currentAddress = address;
        
        console.log("Current Address:", currentAddress);
        setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer));
        console.log("NFT contract successfully initialized");
        console.log(NFTContract);
        // Check if the address is defined before calling handleMintNFT
        
      }).catch((error) => {
        console.error("Error initializing contract:", error);
      });
    console.log('signer')
    }
    initNFTContract();
   
  }, [address]);
  const handleMintNFT = async () => {
    try {
      // Download the canvas as an image
    
      // Check if the request was successful
     
       
        // Optionally, you can show a success message to the user
        
       
          const tx = await NFTContract.addFile(
            address,
            '0',
            fileName,
            fileDescription,
            ipfsUrl

          );
          console.log('done');
        
        //alert(`Staked successfully`);
        //console.log(`NFT created with metadata: ${ticketId}`); 

     
    } catch (error) {
      console.error('Error Staking:', error);
      // Show an error message if something went wrong
     // alert("An error occurred while Staking your tokens. Please try again later.");
    }
  }
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
      if (response.data.IpfsHash) {
        console.log('File stored at IPFS hash:', response.data.IpfsHash);
        const imageUrl = response.data.IpfsHash;
        const imageDownloadUrl = `https://yellow-electric-egret-510.mypinata.cloud/ipfs/${imageUrl}`;
        console.log(imageDownloadUrl);
        setIpfsUrl(imageDownloadUrl);
      } else {
        console.error('IPFS hash not found in response data.');
      }
      window.alert("Upload successful")

      setUploading(false);
      setFile(null);
      setFileName('');
      setFileDescription('');
      setUploadError('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      setUploadError('Error uploading file. Please try again.');
    }
  };

  return (
    <div className='border-2 border-primary p-20 rounded-2xl'>
       
      <div className="flex flex-1 ">
      <label className="form-control w-full max-w-xs">
      
        <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
      </label>
      {/* <div
        className="drop-zone"
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
      </div> */}
      <button className='btn btn-outline  btn-primary mt-[] ml-2' onClick={uploadToPinata} disabled={uploading}>
        Upload to Pinata
      </button></div>
      <div className="flex flex-col">
      <input
        type="text"
        value={fileName}
        onChange={handleFileNameChange}
        placeholder="Enter file name"
        className="input input-bordered input-primary w-full max-w-md ml-2 my-4"      />
      <textarea
        type="text"
        value={fileDescription}
        onChange={handleFileDescriptionChange}
        placeholder="Enter file description"
        className="textarea textarea-primary max-w-md ml-2 mb-4"      />
        

      <button className="btn btn-primary" onClick={handleMintNFT}>Submit</button>
      {uploading && <p>Uploading...</p>}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      
      </div>
      
    </div>
  );
};

export default PinataUploader;
