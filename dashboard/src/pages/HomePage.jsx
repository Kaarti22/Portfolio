import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { clearAllUserErrors, logout } from "@/store/slices/userSlice";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dashboard from "@/components/Dashboard";
import AddProject from "@/components/AddProject";
import AddSkill from "@/components/AddSkill";
import AddApplication from "@/components/AddApplication";
import AddTimeline from "@/components/AddTimeline";
import Addmessages from "@/components/Addmessages";
import Account from "@/components/Account";
import SidebarOption from "@/components/SidebarOption";
import SidebarLink from "@/components/SidebarLink";

const HomePage = () => {
  const [active, setActive] = useState("");

  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
          <nav className="flex flex-col items-center gap-4 px-2 sm:p-5">
            <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full">
              <Package className="h-6 w-6 transition-all group-hover:scale-110" />
              <span className="sr-only">Dashboard</span>
            </Link>
            <SidebarOption optionName={"Dashboard"} icon={<Home className="w-5 h-5" />}/>
            <SidebarOption optionName={"Add Project"} icon={<FolderGit className="w-5 h-5" />}/>
            <SidebarOption optionName={"Add Skill"} icon={<PencilRuler className="w-5 h-5" />}/>
            <SidebarOption optionName={"Add Application"} icon={<LayoutGrid className="w-5 h-5" />}/>
            <SidebarOption optionName={"Add Timeline"} icon={<History className="w-5 h-5" />}/>
            <SidebarOption optionName={"Add Message"} icon={<MessageSquareMore className="w-5 h-5" />}/>
            <SidebarOption optionName={"Account"} icon={<User className="w-5 h-5" />}/>
          </nav>
          <nav className="mt-auto flex-col items-center gap-4 px-2 py-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Logout"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                </Link>
                <SidebarLink hrefName={"#"} linkName={"Dashboard"} icon={<Home className="h-5 w-5" />}/>
                <SidebarLink hrefName={"#"} linkName={"Add Project"} icon={<FolderGit className="h-5 w-5" />}/>
                <SidebarLink hrefName={"#"} linkName={"Add Skill"} icon={<PencilRuler className="h-5 w-5" />}/>
                <SidebarLink hrefName={"#"} linkName={"Add Application"} icon={<LayoutGrid className="h-5 w-5" />}/>
                <SidebarLink hrefName={"#"} linkName={"Add Timeline"} icon={<History className="h-5 w-5" />}/>
                <SidebarLink hrefName={"#"} linkName={"Add Message"} icon={<MessageSquareMore className="h-5 w-5" />}/>
                <SidebarLink hrefName={"#"} linkName={"Account"} icon={<User className="h-5 w-5" />}/>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
            <img
              src={user && user.avatar && user.avatar.url}
              alt="Avatar"
              className="w-20 h-20 rounded-full max-[900px]:hidden"
            />
            <h1 className="text-4xl max-[900px]:text-2xl">
              Welcome back, {user.fullName}
            </h1>
          </div>
        </header>
        {() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard />;
              break;
            case "Add Project":
              return <AddProject />;
              break;
            case "Add Skill":
              return <AddSkill />;
              break;
            case "Add Application":
              return <AddApplication />;
              break;
            case "Add Timeline":
              return <AddTimeline />;
              break;
            case "Add Message":
              return <Addmessages />;
              break;
            case "Account":
              return <Account />;
              break;
            default:
              return <Dashboard />;
              break;
          }
        }}
      </div>
    </>
  );
};

export default HomePage;
