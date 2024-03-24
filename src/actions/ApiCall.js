import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const createLayoutApi = async (name, layout) => {
    console.log(name, layout)
    try {
        const response = await api.post(`/Layout`,
            {
                "companyName": name,
                "companyLayoutList": layout
            }
        );
        const layoutData = response.data;
        return layoutData;
    } catch (error) {
        console.log('Failed to create layout', error)
    }
};
export const getAlllayoutApi = async (name) => {
    try {
        const response = await api.get(`/Layout/${name}`);
        const layoutData = response.data;
        return layoutData;
    } catch (error) {
        console.log('Failed to get all layout', error)
    }
};

export const allocationApi = async (data) => {
    try {
        const response = await api.post("/Allocation", data);
        console.log(response)
        const layoutData = response.data;
        return layoutData;
    } catch (error) {
        console.log('Failed to get allocation', error)
    }
};

export const csvFileApi = async (file, setInCorrectFile) => {
    try {
        const response = await api.post("/Allocation/csvFile", file,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        setInCorrectFile(false)
        const layoutData = response.data;
        return layoutData;
    } catch (error) {
        setInCorrectFile(true)
        console.log('Failed to get allocation', error)
    }
};

export const addLayoutApi = async (name, layout) => {
    console.log(layout)
    try {
        const response = await api.post(`/Layout/updateLayout`,
            {
                "companyName": name,
                "defaultLayout": layout
            }
        );
        const layoutData = response.data;
        return layoutData;
    } catch (error) {
        console.log('Failed to add layout', error)
    }
};

export const updateLayoutApi = async (id, name, layout) => {
    console.log(layout)
    try {
        const response = await api.post(`/Layout/updateLayout`,
            {
                "layoutId": id,
                "companyName": name,
                "defaultLayout": layout
            }
        );
        const layoutData = response.data;
        console.log(layoutData)
        return layoutData;
    } catch (error) {
        console.log('Failed to update layout', error)
    }
};

export const deleteLayoutApi = async (id, name) => {
    console.log(id,name)
    try {
        const response = await api.post(`/Layout/updateLayout`,
            {
                "layoutId": id,
                "companyName": name
            }
        );
        const layoutData = response.data;
        console.log(layoutData)
        return layoutData;
    } catch (error) {
        console.log('Failed to delete layout', error)
    }
};

export const getAllAllocationApi = async (id) => {
    try {
        const response = await api.get(`/Allocation/${id}`);
        const layoutData = response.data;
        return layoutData;
    } catch (error) {
        console.log('Failed to get all allocation', error)
    }
};