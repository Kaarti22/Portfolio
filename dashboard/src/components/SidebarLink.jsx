import React from "react";
import { Link } from "react-router-dom";

const SidebarLink = ({ hrefName, linkName, icon }) => {
  return (
    <Link
      href={hrefName}
      className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
    >
      {icon}
      {linkName}
    </Link>
  );
};

export default SidebarLink;
