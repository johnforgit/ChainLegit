import React, { useState,useEffect } from 'react';
import { Contract, BrowserProvider } from "ethers";
import { useAccount } from 'wagmi'
import NFT from '../../abi/court.json';
import Folder from '../../components/Folder'
import Title from '../../components/Title'
import File from './File'

function FileListPage() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [selectedCard, setSelectedCard] = useState(null);
  const [NFTContract, setNFTContract] = useState(null);
  const [registered , setRegistered] = useState(0);
  //const NFT_CONTRACT_ADDRESS = "0xb783a9df67548569399a1811120b70149a5bf1be";
  const NFT_CONTRACT_ADDRESS = "0x01ff8e5afaba8d220fd56e0f541629ba232db61c";
  const handleSubmit = async () => {
    try {
      // Download the canvas as an image
    
      // Check if the request was successful
     
       
        // Optionally, you can show a success message to the user
       
          const tx = await NFTContract.grantPermission(address);
          console.log('Granted Access!');
        
        //alert(`Staked successfully`);
        //console.log(`NFT created with metadata: ${ticketId}`); 

     
    } catch (error) {
      console.error('Error Staking:', error);
      // Show an error message if something went wrong
     // alert("An error occurred while Staking your tokens. Please try again later.");
    }
  }
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
  
  return (
    <div className='mt-16 w-full'>
        <Title>eee</Title>
  
    <div className='mt-16 flex   mx-10'>
   
<File/>
<File/>
<File/>

    </div></div>
  )
}

export default FileListPage