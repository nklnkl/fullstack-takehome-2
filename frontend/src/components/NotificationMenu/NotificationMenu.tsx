import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import { shortenAddress } from "./util";
import { NotificationMenuClassName } from "./style";
interface NotificationMenuProps {
  className: string;
  address: string;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({className, address}) => {
  return (
    <div className={`${NotificationMenuClassName} ${className}`}>
      <CiBellOn fontSize={24}/>
      <div className="flex-1 max-w-[100px] text-sm">{shortenAddress(address)}</div>
      <FaCaretDown fontSize={12}/>
    </div>
  );
};

export default NotificationMenu;
