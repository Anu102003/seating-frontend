import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const layoutApi = async (name) => {
    try {
        const response = await api.get(`layout/${name}`);
        const layoutData = response.data;
        return layoutData;
    } catch (error) {
        throw new Error(error || 'Failed to get layout');
    }
};

export const postlayoutApi = async (result) => {
    try {
        const response = await api.post("layout", result);
        const layoutData = response.data;
        return layoutData;
    } catch (error) {
        throw new Error(error || 'Failed to post layout');
    }
};

export const allocationApi = async (data) => {
    try {
        const response = await api.post("allocation", data);
        const layoutData = response;
        return layoutData;
    } catch (error) {
        throw new Error(error || 'Failed to get allocation');
    }
};

export const csvFileApi = async (file) => {
    try {
        const response = await api.post("csvFile", file,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        const layoutData = response;
        return layoutData;
    } catch (error) {
        throw new Error(error || 'Failed to post csv file');
    }
};