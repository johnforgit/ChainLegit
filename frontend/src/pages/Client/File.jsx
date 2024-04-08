import { AiTwotoneFolderOpen } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import {useState} from "react"
import { Link } from "react-router-dom";

function File({item}) {



    // Check if item is undefined or null
    if (item === undefined || item === null) {
      return <div className="flex  justify-center items-center">Empty file</div>;
    }



  return (
  

    
    <div className="w-full border-2 border-primary  max-w-sm p-4 bg-white rounded-lg shadow sm:p-8 ">

  <BsFileEarmarkPdfFill className="mx-auto" size={100} />
  <ul role="list" className="space-y-5 my-7">
    <li className="flex items-center">
      <svg
        className="flex-shrink-0 w-4 h-4 text-blue-700 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      <span className="text-base font-normal leading-tight text-gray-500  ms-3">
       {item[0]}
      </span>
    </li>
    <li className="flex">
      <svg
        className="flex-shrink-0 w-4 h-4 text-blue-700 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      <span className="text-base font-normal leading-tight text-gray-500  ms-3">
      {item[1]}
      </span>
    </li>
    
  </ul>

  <a href={item[2]} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200   font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center" target='_blank' rel='noopener noreferrer'>
  {item[0] + "view file"}
  </a>
  
  
</div>

    
      // <div className="max-w-32 overflow-hidden mr-4 ">
        
    //     <BsFileEarmarkPdfFill className="mx-auto" size={100} />
    //      <span className="text-base font-semibold ">{item}</span>
    // </div>
  )
}

export default File