import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";

const SidebarOption = ({ optionName, icon }) => {
  const [active, setActive] = useState("");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
            // onClick={() => setActive(optionName)}
          >
            {icon}
            {/* <Home className="w-5 h-5" /> */}
            <span className="sr-only">{optionName}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{optionName}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarOption;
