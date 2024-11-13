import { create } from 'zustand'

export const useTripsStore = create((set) => ({
    routes : [],
    addTrip: (newRoute:any) => set((state:any) => ({...state, newRoute})), 
    removeAllRoutes: () => (set({}, true))

}))