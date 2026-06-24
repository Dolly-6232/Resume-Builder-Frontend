import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubscriptionState {
  subscription: any | null;
  plans: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscription: null,
  plans: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<any>) => {
      state.subscription = action.payload;
    },
    setPlans: (state, action: PayloadAction<any[]>) => {
      state.plans = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSubscription, setPlans, setLoading, setError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
