import React from 'react';
import { ethers } from "ethers";
import { useStateContext } from '../context';
import { roles } from '../constants'; // Import the JSON object containing roles

const WalletConnect = () => {
    const { status, setStatus, address, setAddress } = useStateContext();

    async function handleClick() {
        let signer = null;
        let provider;

        if (!window.ethereum) {
            alert("Install metamask/ other Web3 wallets");
        } else {
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();   
            setStatus("Connected");
            setAddress(signer.address);
            console.log(address);
            const currentRole = roles[signer.address]; // Find the role of the current address
            console.log("Current Role:", currentRole);
        }
    }

    return (
        <div>
            <button className="bg-black text-white rounded-lg p-3" onClick={handleClick}>
                {status}
            </button>
        </div>
    );
}

export default WalletConnect;
