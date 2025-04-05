import {  FaAngleDown, FaAngleLeft  } from "react-icons/fa";
import { useState } from "react";

function ExpandablePanel({ header, children }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }
    return (
    <div className="mb-2 border rounded">
        <div className="flex p-2 justify-between">
            <div className="flex flex-row items-center justify-between w-full">
                {header}
                <div className="cursor-pointer text-2xl" onClick={handleClick}>
                {!isExpanded ? <FaAngleLeft /> :<FaAngleDown />}
                </div> 
            </div>
        </div>
        {isExpanded && <div className="p-2 border-t">{children}</div>}
    </div>
);
}

export default ExpandablePanel;