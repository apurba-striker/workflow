import Image from "next/image";
import background from "@/public/assets/background.jpg"
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";

const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
          <div className="h-screen w-full bg-purple-300 py-10 flex items-start justify-center">
            <Card className="w-[40vw] flex items-center justify-center p-0">
              <CardContent className="w-full">
                <Suspense fallback={
                  <div>Loading...</div>
                }>
                  {children}
                </Suspense>
              </CardContent>
            </Card>
          </div>
   );
}
 
export default AuthLayout;