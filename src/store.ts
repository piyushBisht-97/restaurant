import { create } from "zustand"
import { devtools } from "zustand/middleware"
export interface User{
    id:number,
    firstName:string,
    lastName:string,
    role:string,
    email:string
}

interface AuthState {
    user:null | User,
    setUser:(user:User) =>void

}

export const useAuthStore = create<AuthState>()(
    devtools((set)=>({
user:null,
setUser:(user) => set({user:user}),
logout:() => set({user:null})

}))
)
