import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
  creatingOrder: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    fetchOrdersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createOrderStart: (state) => {
      state.creatingOrder = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.creatingOrder = false;
      state.orders.push(action.payload);
      state.selectedOrder = action.payload;
    },
    createOrderFailure: (state, action) => {
      state.creatingOrder = false;
      state.error = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o._id === orderId);
      if (order) {
        order.status = status;
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  setSelectedOrder,
  updateOrderStatus,
  clearError
} = orderSlice.actions;

export default orderSlice.reducer;
