"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  variant?: "success" | "failure"
}

const Toaster = ({variant, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const variantClasses = {
    success: "bg-green-500 text-white border-green-600",
    failure: "bg-red-500 text-white border-red-600",
  }

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={`toaster group ${variant ? variantClasses[variant] : ""}`}
      toastOptions={{
        classNames: {
          toast:
            `group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg ${variant ? variantClasses[variant] : ""}`,
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}


export { Toaster }
