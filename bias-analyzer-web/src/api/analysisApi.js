import axios from 'axios';

const API_URL = 'http://localhost:5294/api/analysis';

export const analyzeText = (text) => axios.post(API_URL, JSON.stringify(text), {
    headers: { 'Content-Type': 'application/json' }
});

export const getHistory = () => axios.get(API_URL);

export const analyzeUrl = (url) => axios.post(`${API_URL}/url`, JSON.stringify(url), {
    headers: { 'Content-Type': 'application/json' }
});

export const analyzeCorpus = (urls) => axios.post(`${API_URL}/corpus`, urls, {
    headers: { 'Content-Type': 'application/json' }
});