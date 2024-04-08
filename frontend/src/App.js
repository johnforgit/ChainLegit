import { useSDK } from "@metamask/sdk-react"
import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./Login/page.jsx" // Import your Login component from its folder
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"

import { WagmiConfig } from "wagmi"
import { arbitrum, mainnet, polygonMumbai, sepolia } from "viem/chains"
import Home from "./pages/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import ClientFileUpload from "./pages/Client/ClientFileUpload.jsx"
import FileView from "./pages/Client/FileView.jsx"
import GrantAccess from "./pages/Client/GrantAccess.jsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ClientFolderPage from "./pages/Client/ClientFolderPage.jsx"
import FileListPage from "./pages/Client/FileListPage.jsx"

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "c0dc5278ab28a9280866ca3a0c51fcac"

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

const chains = [mainnet, arbitrum, polygonMumbai, sepolia]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    "--w3m-accent": "#4ed4dc",
    "--w3m-accent-color": "#4ed4dc",
    "--wcm-accent-fill-color": "#4ed4dc",
  },
})

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Router>
        <ToastContainer limit={2} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createPost" element={<ClientFileUpload />} />
          <Route path="/viewDocs/:imgLink" element={<FileView />} />
          <Route path="/Client/Folders" element={<ClientFolderPage />} />
          <Route path="/Client/Files/:id" element={<FileListPage />} />

          <Route
            exact
            path="/Login"
            element={<LoginPage />} // Use your Login component here
          />
          <Route
            exact
            path="/access"
            element={<GrantAccess />} // Use your Login component here
          />
          <Route
            exact
            path="/access/:id"
            element={<GrantAccess />} // Use your Login component here
          />
        </Routes>
      </Router>
    </WagmiConfig>
  )
}

export default App
