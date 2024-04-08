import React, { useState,useEffect } from 'react';
import { Contract, BrowserProvider } from "ethers";
import { useAccount } from 'wagmi'
import NFT from '../../abi/court.json';
import Folder from '../../components/Folder'
import Title from '../../components/Title'
import File from './File'
import { useParams } from "react-router-dom"

function FileListPage() {
  const { id } = useParams()

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
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const readData = async () => {
    try {
      const tx = await NFTContract.getFolderDetails(address,id);
      const dataArray = Object.values(tx);
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
        {/* <Title>{fname}</Title> */}
  
    <div className='mt-16    mx-10'>

      <Title>{data[0]}</Title>
<div className="flex flex-row justify-center  gap-4">
      {data[1]?.map((innerArray, index) => (
          
           
           <File key={index} item={innerArray}/>
              
              
            
            
         
        ))} </div>

     


    </div></div>
  )
}

export default FileListPage