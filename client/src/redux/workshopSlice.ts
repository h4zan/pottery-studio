import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IWorkshop } from '../models/IWorkshop';

interface WorkshopState {
  workshops: {
    [workshopId: number]: {
      workshop: IWorkshop;
      quantity: number;
      selectedDates?: string[];
    };
  };
}

const initialState: WorkshopState = {
  workshops: JSON.parse(localStorage.getItem('cartWorkshops') || '{}'),
};

export const workshopSlice = createSlice({
  name: 'workshop',
  initialState,
  reducers: {
    addWorkshop: (state, action: PayloadAction<IWorkshop>) => {
      const workshopIdToAdd = action.payload.id;
      const selectedDateToAdd =
        action.payload.attributes.selectedDate?.toString() || '';

      if (selectedDateToAdd) {
        const existingWorkshop = Object.values(state.workshops).find(
          (workshopItem) =>
            workshopItem.workshop.id === workshopIdToAdd &&
            workshopItem.selectedDates?.includes(selectedDateToAdd)
        );

        if (existingWorkshop) {
          if (
            existingWorkshop.selectedDates &&
            existingWorkshop.quantity >= 6
          ) {
            console.log('Workshop limit reached for the selected date.');
            return;
          }

          existingWorkshop.quantity += 1;
        } else {
          const newWorkshopId = Date.now();
          state.workshops[newWorkshopId] = {
            workshop: action.payload,
            quantity: 1,
            selectedDates: [selectedDateToAdd],
          };
        }

        localStorage.setItem('cartWorkshops', JSON.stringify(state.workshops));
      }
    },
    /* 
    increaseWorkshopQuantity: (state, action: PayloadAction<number>) => {
      const workshopIdToIncrease = action.payload;

      if (state.workshops[workshopIdToIncrease]) {
        state.workshops[workshopIdToIncrease].quantity += 1;
      }
    },
 */
    decreaseWorkshopQuantity: (
      state,
      action: PayloadAction<{ workshopId: number; selectedDate: string }>
    ) => {
      const { workshopId, selectedDate } = action.payload;

      const workshop = Object.values(state.workshops).find(
        (workshop) =>
          workshop.workshop.id === workshopId &&
          workshop.selectedDates?.some((date) => date === selectedDate)
      );

      if (workshop) {
        workshop.quantity -= 1;

        if (workshop.quantity === 0) {
          const workshopKeys = Object.keys(state.workshops);
          const workshopKeyToRemove = workshopKeys.find(
            (key) => state.workshops[Number(key)].workshop.id === workshopId
          );

          if (workshopKeyToRemove) {
            delete state.workshops[Number(workshopKeyToRemove)];
          }
        }

        localStorage.setItem('cartWorkshops', JSON.stringify(state.workshops));
      }
    },

    clearWorkshops: (state) => {
      state.workshops = {};
      localStorage.removeItem('cartWorkshops');
    },

    removeWorkshopFromCart: (state, action: PayloadAction<number>) => {
      const workshopIdToRemove = action.payload;
      const workshopItem = state.workshops[workshopIdToRemove];

      if (workshopItem.quantity === 1) {
        delete state.workshops[workshopIdToRemove];
      } else {
        state.workshops[workshopIdToRemove].quantity -= 1;

        const selectedDates = state.workshops[workshopIdToRemove].selectedDates;
        if (selectedDates && selectedDates.length > 0) {
          selectedDates.pop();
        }

        localStorage.setItem('cartWorkshops', JSON.stringify(state.workshops));
        console.log('After removal - State:', state.workshops);
      }
    },

    updateWorkshopSelectedDates: (
      state,
      action: PayloadAction<{ workshopId: number; selectedDates: string[] }>
    ) => {
      const { workshopId, selectedDates } = action.payload;
      state.workshops[workshopId].selectedDates = selectedDates;
    },
  },
});

export const getWorkshopCount = (state: RootState) => {
  let workshopCount = 0;

  for (const workshopItem of Object.values(state.workshop.workshops)) {
    workshopCount += workshopItem.quantity;
  }

  return workshopCount;
};

export const getWorkshopState = (state: RootState) => state.workshop;

export const getMemoizedWorkshops = createSelector(
  getWorkshopState,
  (workshopState) => Object.values(workshopState.workshops)
);

export const getTotalWorkshopPrice = createSelector(
  (state: RootState) => Object.values(state.workshop.workshops),
  (workshopItems) => {
    let subtotal = 0;
    const shippingCost = 45;

    for (const workshopItem of workshopItems) {
      subtotal +=
        workshopItem.workshop.attributes.price * workshopItem.quantity;
    }

    const total = subtotal + shippingCost;
    return total.toFixed(2);
  }
);

export const getSubtotalWorkshopPrice = createSelector(
  (state: RootState) => Object.values(state.workshop.workshops),
  (workshopItems) => {
    let subtotal = 0;

    for (const workshopItem of workshopItems) {
      subtotal +=
        workshopItem.workshop.attributes.price * workshopItem.quantity;
    }

    return subtotal.toFixed(2);
  }
);

export const {
  addWorkshop,
  /*   increaseWorkshopQuantity,
   */ decreaseWorkshopQuantity,
  removeWorkshopFromCart,
  clearWorkshops,
  updateWorkshopSelectedDates,
} = workshopSlice.actions;

export default workshopSlice.reducer;
