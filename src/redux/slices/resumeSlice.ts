import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { resumeApi } from '../../api/resume';
import { getApiErrorMessage } from '../../api/client';
import type { Resume, ResumePayload } from '../../types';

interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  loading: false,
  saving: false,
  error: null,
};

export const fetchResumes = createAsyncThunk(
  'resume/fetchResumes',
  async (_, { rejectWithValue }) => {
    try {
      return await resumeApi.getResumes();
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const createResume = createAsyncThunk(
  'resume/createResume',
  async (payload: ResumePayload, { rejectWithValue }) => {
    try {
      return await resumeApi.createResume(payload);
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const updateResume = createAsyncThunk(
  'resume/updateResume',
  async (payload: ResumePayload & { id: string }, { rejectWithValue }) => {
    try {
      return await resumeApi.updateResume(payload);
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const deleteResume = createAsyncThunk(
  'resume/deleteResume',
  async (id: string, { rejectWithValue }) => {
    try {
      await resumeApi.deleteResume(id);
      return id;
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setCurrentResume: (state, action: PayloadAction<Resume | null>) => {
      state.currentResume = action.payload;
    },
    clearResumeError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchResumes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload || 'Unable to load resumes');
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.saving = false;
        state.resumes.unshift(action.payload);
        state.currentResume = action.payload;
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.saving = false;
        state.resumes = state.resumes.map(resume =>
          resume.id === action.payload.id ? action.payload : resume,
        );
        state.currentResume = action.payload;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.saving = false;
        state.resumes = state.resumes.filter(resume => resume.id !== action.payload);
        if (state.currentResume?.id === action.payload) {
          state.currentResume = null;
        }
      })
      .addMatcher(
        isAnyOf(createResume.pending, updateResume.pending, deleteResume.pending),
        state => {
          state.saving = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(createResume.rejected, updateResume.rejected, deleteResume.rejected),
        (state, action) => {
          state.saving = false;
          state.error = String(action.payload || 'Resume operation failed');
        },
      );
  },
});

export const { clearResumeError, setCurrentResume } = resumeSlice.actions;
export default resumeSlice.reducer;
