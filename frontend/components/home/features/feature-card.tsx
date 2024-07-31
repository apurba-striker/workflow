import { Card } from "@/components/ui/card"
import Image from "next/image"

interface FeatureCardProps{
    image: string,
    title: string,
    description: string
}

export const FeatureCard = ({
    image,
    title,
    description
} : FeatureCardProps) => {

    return (
        <Card className="px-4 py-4 flex gap-2">
            <Image
                src={`/assets/features/${image}`}
                alt="img"
                height={100}
                width={100}
            />
            <div className="flex flex-col gap-1 items-start text-neutral-400">
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-sm">{description}</p>
            </div>
        </Card>
    )
}