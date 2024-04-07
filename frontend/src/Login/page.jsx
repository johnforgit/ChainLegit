import React from 'react'

import PinataUploader from '../components/Fileupload'
import PinataFileViewer from '../components/Fileview'
const page = () => {
  return (
    <div>
        {/* <button className="">
            <WalletConnect />
        </button> */}
        
       <PinataUploader />
        <PinataFileViewer />
        
    </div>
  )
}

export default page