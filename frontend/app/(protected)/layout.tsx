import { Navbar } from "@/components/navbar/navbar";
import { getCurrentUser } from "@/lib/get-current-user";
import { ModalProvider } from "@/providers/modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Toaster } from "@/components/ui/toaster";


export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className="h-screen w-full transition-colors duration-300">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                >
                    <ModalProvider/>
                    <Toaster />
                    <div className="w-full h-full flex">
                        <div className="w-[18%] h-full">
                            <Sidebar user={currentUser}/>
                        </div>
                        <div className="w-[82%] h-full bg-[#f5f5f5] dark:bg-background ">
                            {children}
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}