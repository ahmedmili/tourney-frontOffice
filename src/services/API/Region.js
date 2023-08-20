import api from '../axiosApi';


async function getRegionList() {
    try {
        const response = await api.get("/regions/");
        if (response.data.success === true) {
            const { message, success,data } = response.data;
            return { message, success,data };
        }
         else {
            const { message, success } = response.data
            return { message, success }
        }
    } catch (error) {
        throw error;
    }
}

async function searchFor(region,keywords) {
    try {
        const {data,message,success} = await api.get("partners/searchForPartner?region="+ region + "&keywords=" + keywords);
        if (data) {
            return {data,message, success  };
        }
         else {
            return { message, success }
        }
    } catch (error) {
        throw error;
    }
}


export const regionService = {
    getRegionList,
    searchFor,
    
};





