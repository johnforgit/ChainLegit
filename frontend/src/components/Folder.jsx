import { AiTwotoneFolderOpen } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Title from "./Title";
import {useState} from "react"
import { Link } from "react-router-dom";
function Folder({name}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  return (
   


    <div className="max-w-32   mr-4 flex flex-1 ">
        
        <AiTwotoneFolderOpen className="mx-auto" size={100} />
        <div className="dropdown dropdown-right">
      <div tabIndex={0} role="button" className="" onClick={toggleDropdown}>
      <HiOutlineDotsVertical />
      </div>
      {isOpen && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li> <Link to="/GrantAccess">Grant Access</Link> </li> 
          
        </ul>
      )}
    </div>
         <span className="text-base font-semibold ">{name}</span>
    </div>
 
  )
}

export default Folder