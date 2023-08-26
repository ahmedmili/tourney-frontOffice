import api from '../axiosApi';

async function loginUser(values) {
    try {
        const response = await api.post("/clients/login", values);
        if (response.data.success === true) {
            const { token, user, message, success } = response.data;
            return { token, user, message, success };
        } else {
            const { message, success } = response.data
            return { message, success }
        }
    } catch (error) {
        throw error;
    }
}
async function registerUser(values) {
    try {
        const response = await api.post("clients/signup", {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            confirm_password: values.passwordConfirm,
            phone: values.phone,
        }, { authorization: false });
        const token = response.data.data.token;
        const user = response.data.data.client;
        return { token, user };
    } catch (error) {
        throw error;
    }
}
async function getUser(user_id) {
    try {
        if (user_id === undefined) {
            return { status: undefined, data: undefined };
        }
        const response = await api.get(`getClient/${user_id}`);
        const { status, data } = response;
        return { status, data };
    } catch (error) {
        throw error;
    }
}

async function getRegions() {
    try {
        const response = await api.get(`/regions/`,);
        const { success, data, code } = response.data;
        return { success, data, code };
    } catch (error) {
        throw error;
    }
}
async function getMyAgenda() {
    try {
        const response = await api.get("partners/agenda",);
        const { data } = response;
        return { data };
    } catch (error) {
        throw error;
    }
}
async function deleteProgram(id) {
    try {
        const response = await api.delete("partners/agenda?id=" + id,);
        const { success } = response.data;

        return { success };
    } catch (error) {
        throw error;
    }
}

async function addPartner(value) {
    const data = value;
    try {
        const response = await api.post("partners/create", data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        const { success, code, message } = response.data;
        return { success, code, message };
    } catch (error) {
        throw error;
    }
}



export const userService = {
    loginUser,
    registerUser,
    getUser,
    getRegions,
    getMyAgenda,
    deleteProgram,
    addPartner
};
