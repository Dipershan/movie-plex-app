export const setToken = (key = "acess_token" , value) =>{
    const valueType =  typeof value;
    const data  =  valueType === "string" ? value : JSON.stringify(value);
    return localStorage.setItem(key ,    data);
};
export const getToken = (key = "acess_token" ) =>{
    return localStorage.getItem(key ,  JSON.stringify())
};
export const removeToken = (key = "acess_token") =>{
    return localStorage.removeItem(key);
};