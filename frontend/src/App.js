import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./Login/page.jsx" // Import your Login component from its folder
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"

import { WagmiConfig } from "wagmi"
import { arbitrum, mainnet } from "viem/chains"
import Home from "./pages/Home.jsx"
import Navbar from "./components/Navbar.jsx"

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'c0dc5278ab28a9280866ca3a0c51fcac'

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Router>
        {/* <ToastContainer limit={2} /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            exact
            path="/Login"
            element={<LoginPage />} // Use your Login component here
          />
        </Routes>
      </Router>
    </WagmiConfig>
  )
}

export default App
