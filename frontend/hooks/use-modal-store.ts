import { Task } from "@/types";
import { create } from "zustand";

export type ModalType = "createTaskModal" | "deleteTaskModal" | "editTaskModal";
export type Status = "TO_DO" | "IN_PROGRESS" | "UNDER_REVIEW" | "COMPLETED";

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    taskId: string | null;
    task: Task | null;
    status: Status | null;
    onOpen: (type: ModalType, taskId?: string, task?: Task, status?: Status) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    taskId: null,
    task: null,
    status: null,
    onOpen: (type, taskId, task, status) => set({ type, isOpen: true, taskId, task, status }),
    onClose: () => set({ type: null, isOpen: false, taskId: null, task: null, status: null }),
}));