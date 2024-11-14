import { region } from '@/types/routing';
import { create } from 'zustand';

interface Trip {
    id: string;
    source: region;
    destination: region;
    date: Date;
    state: 'planned' | 'ongoing' | 'completed' | 'cancelled';
};

interface TripState {
    trips: Trip[];
    addTrip: (trip: Omit<Trip, 'id'>) => void;
    updateTrip: (id: string, updatedTrip: Partial<Trip>) => void;
    getTrip: (id: string) => Trip | undefined;
    getAllTrips: () => Trip[];


};

export const useTripsStore = create<TripState>((set, get) => ({
    trips: [],

  addTrip: (trip) => set((state) => ({
    trips: [...state.trips, { ...trip, id: Date.now().toString() }]
  })),

  removeTrip: (id: string) => set((state) => ({
    trips: state.trips.filter((trip) => trip.id !== id)
  })),

  updateTrip: (id, updatedTrip) => set((state) => ({
    trips: state.trips.map((trip) =>
      trip.id === id ? { ...trip, ...updatedTrip } : trip
    )
  })),

  getTrip: (id) => {
    return get().trips.find((trip) => trip.id === id);
  },

  getAllTrips: () => {
    return get().trips;
  }
}));