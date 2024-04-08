import { AiTwotoneFolderOpen } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";

import {useState} from "react"
import { Link } from "react-router-dom";
function Folder({name , id1}) {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  return (
   
<div>
<Link to={`/Client/Files/${++id1}`} >
    <div className="max-w-32   mr-4 flex flex-1 flex-col justify-end ">
        
  
   
         <span className="text-base  text-2xl font-bold">{name}</span>
    </div>
   
    <AiTwotoneFolderOpen className="mx-auto" size={150} /> </Link>
        <div className="dropdown dropdown-right">
      <div tabIndex={0} role="button" className="" onClick={toggleDropdown}>
      <HiOutlineDotsVertical />
      </div>
      {isOpen && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>  <Link to={`/access/${id1}`}>Grant Access</Link>  </li> 
          
        </ul>
      )}
      
    </div>
</div>

 
  )
}

export default Folder