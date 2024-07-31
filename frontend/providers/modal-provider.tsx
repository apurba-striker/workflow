import { CreateTaskModal } from "@/components/modals/create-task-modal"
import { EditTaskModal } from "@/components/modals/edit-task-modal"

export const ModalProvider = () => {
    return (
        <>
            <EditTaskModal/>
            <CreateTaskModal/>
        </>
    )
}