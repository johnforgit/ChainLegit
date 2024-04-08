import React, { useState, useEffect } from 'react';
import Folder from '../../components/Folder';
import Title from '../../components/Title';
import { Contract, BrowserProvider } from "ethers";
import NFT from '../../abi/court.json';
import { useAccount } from 'wagmi';

function ClientFolderPage() {
  const { address } = useAccount();
  const [NFTContract, setNFTContract] = useState(null);
  const [data, setData] = useState([]);
  const [folderName, setFolderName] = useState('');
    const NFT_CONTRACT_ADDRESS = "0x9060bCbB4804d4E0FD65faC28D832Aa6b88561cB";

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleCreateFolder = async () => {
    try {
      // Create folder logic...
      const tx = await NFTContract.createFolder(folderName);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const readData = async () => {
    try {
      const tx = await NFTContract.getFolderNames(address);
    //  const dataArray = Object.values(tx);
    const dataArray = Object.values(tx).filter((_, index) => index !== 0 && index !== 4);

    //  dataArray.splice(0,3)
     // dataArray.splice(3, 1);
      setData(dataArray);
    } catch (error) {
      console.error('Error reading folder:', error);
    }
  };

  useEffect(() => {
    async function initNFTContract() {
      const provider = new BrowserProvider(window.ethereum);
      try {
        const signer = await provider.getSigner();
        const currentAddress = address;
        setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer));
        console.log("NFT contract successfully initialized");
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    }
    initNFTContract();
  }, [address]);

  useEffect(() => {
    if (NFTContract) {
      readData();
    }
  }, [NFTContract]);

  return (
    <div className='mt-16 w-full'>
      <Title>Folder Creation</Title>
      <div className='mt-16 flex mx-10'>
        {/* Display input field for entering folder name */}
        <input
          type='text'
          value={folderName}
          onChange={handleInputChange}
          placeholder='Enter folder name'
          className='border border-gray-300 px-2 py-1 rounded-md mr-2'
        />
        <button onClick={handleCreateFolder} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create new</button>
      </div>
      {/* Display existing folders */}
      <div className='mt-4 mx-10 flex flex-wrap'>
        {data.map((folderName, index) => ( <Folder key={index} name={folderName} id1={index}/>)
           
           
          
          
        )}
      </div>
    </div>
  );
}

export default ClientFolderPage;
