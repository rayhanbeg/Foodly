import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foods: [],
  filteredFoods: [],
  selectedFood: null,
  isLoading: false,
  error: null,
  currentCategory: 'all',
  searchQuery: ''
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    fetchFoodsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchFoodsSuccess: (state, action) => {
      state.isLoading = false;
      state.foods = action.payload;
      state.filteredFoods = action.payload;
    },
    fetchFoodsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedFood: (state, action) => {
      state.selectedFood = action.payload;
    },
    filterByCategory: (state, action) => {
      state.currentCategory = action.payload;
      if (action.payload === 'all') {
        state.filteredFoods = state.foods;
      } else {
        state.filteredFoods = state.foods.filter(food => food.category === action.payload);
      }
    },
    searchFoods: (state, action) => {
      state.searchQuery = action.payload;
      if (!action.payload) {
        state.filteredFoods = state.currentCategory === 'all' 
          ? state.foods 
          : state.foods.filter(food => food.category === state.currentCategory);
      } else {
        const query = action.payload.toLowerCase();
        state.filteredFoods = state.foods.filter(food =>
          (food.name.toLowerCase().includes(query) || food.description.toLowerCase().includes(query)) &&
          (state.currentCategory === 'all' || food.category === state.currentCategory)
        );
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  fetchFoodsStart,
  fetchFoodsSuccess,
  fetchFoodsFailure,
  setSelectedFood,
  filterByCategory,
  searchFoods,
  clearError
} = foodSlice.actions;

export default foodSlice.reducer;
