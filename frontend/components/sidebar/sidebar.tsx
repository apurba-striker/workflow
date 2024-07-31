"use client"

import { User } from "@/types"
import { Button } from "../ui/button";
import { ArrowBigLeftDash, ArrowBigRightDash, BarChart, Bell, CircuitBoard, Download, HomeIcon, Plus, PlusCircle, Settings, Users } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { UserAvatar } from "../navbar/user-avatar";
import { ThemeToggle } from "../theme-toggle";
import { SidebarItem } from "./sidebar-item";
import { useModal } from "@/hooks/use-modal-store";
import { useTransition } from "react";
import { signOut } from "@/actions/logout.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { DEFAULT_LOGOUT_REDIRECT } from "@/routes";

interface SidebarProps{
    user: User;
}

export const Sidebar = ({
    user,
} : SidebarProps) => {

    const { onOpen } = useModal();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSignOut = async () => {
        startTransition(() => {
            signOut()
                .then((data : any) => {
                    if(data.redirect){
                        router.push(`${DEFAULT_LOGOUT_REDIRECT}`)
                    }
                })
                .catch((error: any) => {
                    toast.error("Unexpected error encountered")
                })
        })
    }

    return (
        <div className="bg-white dark:bg-black h-full w-full py-6 px-4 flex flex-col justify-between ">
            <div className="flex flex-col w-full gap-4">
                <div className="flex items-center gap-2">
                    <UserAvatar user={user}/>
                    <p>{user.name ? user.name : user.email}</p>
                </div>

                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <Bell/>
                        <ThemeToggle/>
                        <ArrowBigRightDash/>
                    </div>
                    <Button onClick={handleSignOut} variant={'secondary'}>
                        Logout
                    </Button>
                </div>

                <div className="w-full flex flex-col">
                    <SidebarItem
                        label="Home"
                        route="home"
                        icon={
                            <HomeIcon/>
                        }
                    />
                    <SidebarItem
                        label="Boards"
                        route="boards"
                        icon={
                            <CircuitBoard/>
                        }
                    />
                    <SidebarItem
                        label="Settings"
                        route="settings"
                        icon={
                            <Settings/>
                        }
                    />
                    <SidebarItem
                        label="Teams"
                        route="teams"
                        icon={
                            <Users/>
                        }
                    />
                    <SidebarItem
                        label="Analytics"
                        route="analytics"
                        icon={
                            <BarChart/>
                        }
                    />
                    <Button 
                        className="w-full gap-2 mt-4"
                        onClick={() => {
                            onOpen('createTaskModal')
                        }}
                    >
                        <p>Create new task</p>
                        <Plus size={20} className="bg-white rounded-full text-primary"/>
                    </Button>
                </div>
                
            </div>
            <div>
                <Button className="w-full h-full gap-2" variant={'secondary'}>
                    <Download size={28}/>
                    <div className="flex flex-col items-start">
                        <p className="">Download the app</p>
                        {/* <p className="font-light">Get the full experience</p> */}
                    </div>
                </Button>
            </div>
        </div>
    )
}