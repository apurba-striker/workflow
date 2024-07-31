"use client"

import { User } from "@/types"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { FaQuestionCircle } from "react-icons/fa";
import { FeatureCard } from "./features/feature-card";
import { Input } from "../ui/input";
import { Calendar, Filter, Plus, Share, Stars } from "lucide-react";
import { Button } from "../ui/button";

interface HomeHeaderProps{
    user: User;
}

export const HomeHeader = ({
    user,
}: HomeHeaderProps) => {

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-4xl font-bold">Good morning, {user.name ? user.name : user.email}</h1>
                <div className="flex items-center gap-2">
                    <p>Help & feedback</p>
                    <QuestionMarkCircledIcon/>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                <FeatureCard
                    title="Introduction"
                    description="Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
                    image="first.svg"
                />
                <FeatureCard
                    title="Share Notes Instantly"
                    description="Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options."
                    image="second.svg"
                />
                <FeatureCard
                    title="Access Anywhere"
                    description="Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
                    image="third.svg"
                />
            </div>

            <div className="w-full flex items-center justify-between">
                <div>
                    <Input placeholder="Search"/>
                </div>
                <div className="flex items-center gap-4">

                    <Tag label="Calendar view" icon={<Calendar size={20}/>}/>
                    <Tag label="Automation" icon={<Stars size={20}/>}/>
                    <Tag label="Filter" icon={<Filter size={20}/>}/>
                    <Tag label="Share" icon={<Share size={20}/>}/>
                    
                    <Button
                        className="gap-2"
                        onClick={() => {
                            
                        }}
                    >
                        <p>Create new</p>
                        <Plus size={20} className="bg-white rounded-full text-primary"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}


interface TagProps{
    label: string;
    icon: React.ReactNode;
}
const Tag = ({
    label,
    icon,
}: TagProps) => {

    return (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <p>{label}</p>
            {icon}
        </div>
    )
} 