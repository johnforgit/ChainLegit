import React, { useState } from 'react';
import Folder from '../../components/Folder';
import Title from '../../components/Title';
import { Contract, BrowserProvider } from "ethers";
import NFT from '../../abi/court.json';
import {  useEffect } from 'react';
import { useAccount } from 'wagmi'
function ClientFolderPage() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [selectedCard, setSelectedCard] = useState(null);
  const [NFTContract, setNFTContract] = useState(null);
  const [registered , setRegistered] = useState(0);
  const NFT_CONTRACT_ADDRESS = "0x9060bCbB4804d4E0FD65faC28D832Aa6b88561cB";
  //const NFT_CONTRACT_ADDRESS = "0x01ff8e5afaba8d220fd56e0f541629ba232db61c";
  const [folderName, setFolderName] = useState('');

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };
  const handleCreateFolder = async () => {
    try {
      // Download the canvas as an image
    
      // Check if the request was successful
     
       
        // Optionally, you can show a success message to the user
        
        // const ticketId = await NFTContract.isUserRegistered(address);
        // //await ticketId.wait();
        // console.log(ticketId);
        // if (!ticketId){
          const tx = await NFTContract.createFolder(folderName);
          console.log('done creating folder');
        
        //alert(`Staked successfully`);
        //console.log(`NFT created with metadata: ${ticketId}`); 

     
    } catch (error) {
      console.error('Error creating folder:', error);
      // Show an error message if something went wrong
     // alert("An error occurred while Staking your tokens. Please try again later.");
    }
  }
  const readData = async () => {
    try {
      // Download the canvas as an image
    
      // Check if the request was successful
     
       
        // Optionally, you can show a success message to the user
        
        // const ticketId = await NFTContract.isUserRegistered(address);
        // //await ticketId.wait();
        // console.log(ticketId);
        // if (!ticketId){
          console.log(address);
          const tx = await NFTContract.getFolderNames(address);
          console.log(tx);
        
        //alert(`Staked successfully`);
        //console.log(`NFT created with metadata: ${ticketId}`); 

     
    } catch (error) {
      console.error('Error reading folder:', error);
      // Show an error message if something went wrong
     // alert("An error occurred while Staking your tokens. Please try again later.");
    }
  }
  // const handleCreateFolder = () => {
  //   // You can perform actions here when the user clicks the "Create new" button
  //   console.log("Creating folder with name:", folderName);
  //   // Reset the input field after creating the folder
  //   setFolderName('');
  // };
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
        readData();
        // Check if the address is defined before calling handleMintNFT
        
      }).catch((error) => {
        console.error("Error initializing contract:", error);
      });
    console.log('signer')
    }
    initNFTContract();
   
  }, [address]);
  return (
    <div className='mt-16 w-full'>
      <Title>eee</Title>
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
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
      </div>
    </div>
  );
}

export default ClientFolderPage;
