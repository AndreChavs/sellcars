import {create} from 'zustand';

interface DataStore {
  dataSlide: DataGridState[];
  setDataSlide: (formData:(DataGridState)[] ) => void | null ;
}

const useStore = create<DataStore>((set) => ({
  dataSlide: [],
  setDataSlide: (formData) => set((state) => ({dataSlide:[...formData]})) 
}))


//------------------------------------------------------------------

interface TypeSidebar {
  active: boolean;
  setActive: () => void;
}

const useSidebar = create<TypeSidebar>( (set) => ({
  active: false,
  setActive: () => set((state) => ({active:!state.active}))
}))

//-------------------------------------------------------------------

interface TypeDataCar {
  dataCar : DataGridCar[],
  setDataCar: (formData:(DataGridCar)[]) => void;
}
const useCar = create<TypeDataCar>( (set) => ({
  dataCar: [],
  setDataCar: (formData) => set( () => ({dataCar:[...formData]}))
}))

export {
  useStore,
  useSidebar,
  useCar
}