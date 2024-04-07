import React from 'react'

import PinataUploader from '../components/Fileupload'
import PinataFileViewer from '../components/Fileview'
const page = () => {
  return (
    <div>
        {/* <button className="">
            <WalletConnect />
        </button> */}
        <button>
        <w3m-button />
        </button>
       <PinataUploader />
        <PinataFileViewer />
        
    </div>
  )
}

export default page