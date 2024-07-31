interface HeaderProps{
    label: string;
}

export const Header = ({
    label,
} : HeaderProps) => {

    return (
        <div className="
            w-full flex flex-col gap-y-4 
            items-center justify-center
        ">
            <div className="text-3xl font-bold">
                <h1>Welcome to <span className="text-primary">Workflo</span>!</h1>
            </div>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}