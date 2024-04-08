import React from 'react'
import PinataUploader from '../../components/Fileupload'
import Title from '../../components/Title'

function ClientFileUpload() {
  return (<div className="mt-10 min-h-screen  space-y-10 flex-col flex justify-center items-center">

    <Title > Upload File</Title>
    
   <PinataUploader/></div>
  )
}

export default ClientFileUpload