import {instance} from "../utils/axios";
import { APIs } from "../constants";
import {getToken} from "../utils/storage"

const create  = (payload) =>{
    return instance.post(APIs.MOVIES ,  payload ,{headers:{
        access_token: getToken("access_token"),
        "Content-Type":"multipart/form-data",
    }})
};

const list = (limit, page, title) => {
    return instance.get(
      `${APIs.MOVIES}?limit=${limit}&page=${page}&title=${title}`
    );
  };

// const getBySlug  = (slug) =>{};

// const update  = (id ,  payload) =>{};

const MovieServices = {
    create ,
    list,
    // getBySlug,
    // update
};
export default MovieServices;