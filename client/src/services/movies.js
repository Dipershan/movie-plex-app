import {instance} from "../utils/axios";
import { APIs } from "../constants";
import {getToken} from "../utils/storage"

const create = (payload) => {
  return instance.post(APIs.MOVIES, payload, {
    headers: {
      access_token: getToken("access_token"),
      "Content-Type": "multipart/form-data",
    },
  });
};

const list = (limit, page, title) => {
    return instance.get(
      `${APIs.MOVIES}?limit=${limit}&page=${page}&title=${title}`
    );
  };
  

  const updateById = (id, payload) => {
    return instance.put(`${APIs.MOVIES}/${id}`, payload, {
      headers: {
        access_token: getToken("access_token"),
      
      },
    });
  };


 
  const getById = (id) => {
    return instance.get(`${APIs.MOVIES}/${id}`, {
      headers: {
        access_token: getToken("access_token"),
      },
    });
  };





  const updateSeats = async (id, seats) => {
    try {
      const response = await instance.patch(`${APIs.MOVIES}/${id}/seats`, seats, {
        headers: {
          access_token: getToken("access_token"),
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in updateSeats:", error);
      throw error;
    }
  };
  



const MovieServices = {
    create ,
    list,
     getById,
     updateById,
     updateSeats
};
export default MovieServices;