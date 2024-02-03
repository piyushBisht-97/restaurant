// Auth sevice 
import {Cretendials} from '../types'
import {api} from './client'
export const login = (credentials:Cretendials) =>{api.post("/auth/login",credentials)}
export const self = () => api.get('/auth/self')