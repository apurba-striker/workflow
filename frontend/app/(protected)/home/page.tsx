import { getTasks } from "@/actions/tasks/get-tasks.action";
import { HomeClient } from "@/components/home/home-client";
import { HomeHeader } from "@/components/home/home-header";
import { DataTable } from "@/components/users/data-table";
import { getCurrentUser } from "@/lib/get-current-user";


const HomePage = async () => {

    const currentUser = await getCurrentUser();
    const { tasks } = await getTasks();

    return (
        <div className="h-full w-full  px-5 py-4">
            <HomeHeader user={currentUser}/>
            <HomeClient user={currentUser} tasks={tasks}/>
        </div>
    )
}
export default HomePage;