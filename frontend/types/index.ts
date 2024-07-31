export type User = {
    name?: string,
    email?: string,
    image?: string,
    role: 'GUEST' | 'ADMIN',
}
export type Task = {
    id: string;
    title?: string,
    description?: string,
    status?: string,
    priority?: string,
    deadline?: Date,
}