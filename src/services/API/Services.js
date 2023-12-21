import api from '../axiosApi';


async function searchFor(id) {
    try {
        const {data,message,success} = await api.get("partners/searchForPartnerById?id=" + id);
        
        if (data) {
            return {data, success  };
        }
         else {
            return { message, success }
        }
    } catch (error) {
        throw error;
    }
}
async function addToMyCalendar(data) {
    try {
        
        const response = await api.post("partners/add",data);
        const {message,success,code} = response.data
        if (code === 200) {
            return {code,message, success  };
        }
         else {
            return { message, success }
        }
    } catch (error) {
        throw error;
    }
}


export const ServicesService = {
    searchFor,
    addToMyCalendar,
    
};





