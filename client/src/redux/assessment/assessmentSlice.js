import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import assessmentService from './assessmentService';

const initialState = {
    assessments: [],
    criteria: [],
    trials: [],
    isLoading: false,
    isError: false,
};

export const fetchAssessments = createAsyncThunk(
    'assessment/fetchAssessments',
    async (videoId) => {
        try {
            const assessments = await assessmentService.fetchAssessments(videoId);
            return assessments;
        } catch (error) {
            throw new Error('Failed to fetch assessments');
        }
    }
);

export const fetchCriteria = createAsyncThunk(
    'assessment/fetchCriteria',
    async () => {
        try {
            const criteria = await assessmentService.fetchCriteria();
            return criteria;
        } catch (error) {
            throw new Error('Failed to fetch criteria');
        }
    }
);

export const fetchTrials = createAsyncThunk(
    'assessment/fetchTrials',
    async () => {
        try {
            const trials = await assessmentService.fetchTrials();
            return trials;
        } catch (error) {
            throw new Error('Failed to fetch trials');
        }
    }
);

export const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssessments.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAssessments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.assessments = action.payload;
            })
            .addCase(fetchAssessments.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(fetchCriteria.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchCriteria.fulfilled, (state, action) => {
                state.isLoading = false;
                state.criteria = action.payload;
            })
            .addCase(fetchCriteria.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(fetchTrials.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTrials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trials = action.payload;
            })
            .addCase(fetchTrials.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default assessmentSlice.reducer;
