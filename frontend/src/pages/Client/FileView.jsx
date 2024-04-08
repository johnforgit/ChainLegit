import React from 'react'
import PinataUploader from '../../components/Fileupload'
import PinataFileViewer from '../../components/PinataFileViewer'
import { useParams } from "react-router-dom"

function FileView() {
  const { imgLink } = useParams()
  console.log(imgLink)
  return (





    <PinataFileViewer fileUrl1={imgLink} className="min-h-screen "/>
  )
}

export default FileView