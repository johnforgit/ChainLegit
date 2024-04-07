import React from "react";
import { useState , useEffect } from 'react';
import { useAccount } from 'wagmi'
import NFT from '../abi/court.json';
import { TbLockBolt } from "react-icons/tb";
import { Contract, BrowserProvider } from "ethers";
function Home() {
  
  const { address, isConnecting, isDisconnected } = useAccount()
  const [selectedCard, setSelectedCard] = useState(null);
  const [NFTContract, setNFTContract] = useState(null);
  const [registered , setRegistered] = useState(0);
  //const NFT_CONTRACT_ADDRESS = "0xb783a9df67548569399a1811120b70149a5bf1be";
  const NFT_CONTRACT_ADDRESS = "0x01ff8e5afaba8d220fd56e0f541629ba232db61c";
  const handleMintNFT = async () => {
    try {
      // Download the canvas as an image
    
      // Check if the request was successful
     
       
        // Optionally, you can show a success message to the user
        
        const ticketId = await NFTContract.isUserRegistered(address);
        //await ticketId.wait();
        console.log(ticketId);
        if (!ticketId){
          const tx = await NFTContract.createUser();
          console.log('done');
        }
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
    <div
      className="hero h-screen w-full"
      style={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/mentor-61921.appspot.com/o/bg.sss.jpg?alt=media&token=ad55cc4e-613a-47a3-99cf-290db9686502)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-5xl text-white ">
          <span className="text-3xl text-center md:text-6xl flex justify-center font-bold md:mb-24">
          ChainLegit <TbLockBolt className="ml-3" />
          </span>
          <p className="mb-5 font font-semibold md:text-3xl">

          ChainLegit: Transforming legal document exchange with blockchain for secure, efficient transactions. Join us to reshape the legal landscape with seamless, secure exchanges.          </p>
          <button className="btn btn-primary" onClick={handleMintNFT}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
