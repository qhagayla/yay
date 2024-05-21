import axios from 'axios';
import { BASE_URL } from '@/../Globals.js';

const ASSESSMENT_URL = `${BASE_URL}/assessments/assessments`;
const CRITERIA_URL = `${BASE_URL}/assessments/criteria/`;
const TRIALS_URL = `${BASE_URL}/assessments/trials/`;

const fetchAssessments = async (videoId) => {
    try {
        const response = await axios.get(ASSESSMENT_URL, {
            params: {
                video: videoId
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch assessments');
    }
};

const fetchCriteria = async () => {
    try {
        const response = await axios.get(CRITERIA_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch criteria');
    }
};

const fetchTrials = async () => {
    try {
        const response = await axios.get(TRIALS_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch trials');
    }
};

const assessmentService = {
    fetchAssessments,
    fetchCriteria,
    fetchTrials,
};

export default assessmentService;
