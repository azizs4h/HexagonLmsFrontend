import axios from "axios";

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`
}

export const get = (url) => {
    axios.get(url, {headers})
        .then((res) => {
           return res;
        })
        .catch((err) => {
            return err;
        })
}

export const post = (url, data) => {
    axios.post(url, data,{headers})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        })
}


export const del= (url) =>{
    axios.delete(url,{headers})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err
        })
}
