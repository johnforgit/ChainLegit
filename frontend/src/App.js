import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Login/page.jsx"; // Import your Login component from its folder
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <h1 className="text-3xl font-bold underline">Hello world!</h1>
            </>
          }
        />
        <Route
          exact
          path="/Login"
          element={<LoginPage />} // Use your Login component here
        />
      </Routes>
    </Router>
    </WagmiConfig>
  );
}

export default App;
