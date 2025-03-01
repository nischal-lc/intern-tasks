import axios from "axios";

export const fetchData = async () => {
    const response = await axios.get("/api/earthquakes");
    const data = await response.data;
    return data;
};

export const addEq = async(x) => {
    const response =  await axios.post(
     "/api/earthquakes",
        JSON.stringify(x),
     {
         headers: {
               "Content-Type": "application/json",
         },
        }
    );
    return response;
}


export const editEq = async(data, id) => {
    const response = await axios.put(
        `/api/earthquakes/${id}`,
        JSON.stringify(data),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response
}

export const deleteEq = async(id) => {
    const response  = axios.delete(`/api/earthquakes/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}


export const getOneEq = async(id) => {
    const response  = axios.get(`/api/earthquakes/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}