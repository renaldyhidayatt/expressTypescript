export interface DaoUsers {
    registerService(email: string, password: string): Promise<any>
    findByid(id: string): Promise<any>
    findByEmail(email: string): Promise<any>
    deleteUser(id: string): Promise<any>
}