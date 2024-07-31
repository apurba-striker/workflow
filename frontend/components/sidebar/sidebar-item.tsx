"use client"

import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps{
    label: string;
    route: string;
    icon: React.ReactNode;
}

export const SidebarItem = ({
    label,
    route,
    icon
} : SidebarItemProps) => {

    const router = useRouter();
    const pathname = usePathname();
    const isActive = `/${route}` === pathname;

    return(
        <div 
            className={`px-4 p-3 w-full flex items-center gap-2 
                        ${isActive ? 'bg-neutral-100 dark:bg-neutral-900' : 'bg-transparent'}
                        cursor-pointer hover:underline rounded-md
            `}
            onClick={() => {router.push(`/${route}`)}}
        >
            <p>{icon}</p>
            <p className="text-sm font-medium">{label}</p>
        </div>
    )
}