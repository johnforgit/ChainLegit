import { AiTwotoneFolderOpen } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import {useState} from "react"
import { Link } from "react-router-dom";

function File({name}) {
  return (
   
    <div className="max-w-32 overflow-hidden mr-4 ">
        
        <BsFileEarmarkPdfFill className="mx-auto" size={100} />
         <span className="text-base font-semibold ">{name}</span>
    </div>
  )
}

export default File