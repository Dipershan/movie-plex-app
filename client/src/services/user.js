import {instance} from "../utils/axios";
import { APIs } from "../constants";
import {getToken} from "../utils/storage"

const create  = (payload) =>{
    return instance.post(APIs.USERS ,  payload ,{headers:{
        access_token: getToken("access_token"),
        "Content-Type":"multipart/form-data",
    }})
};

const list = (limit, page) => {
    return instance.get(
      `${APIs.USERS}?limit=${limit}&page=${page}`,{
        headers: {
          access_token: getToken("access_token"),
        },  
      }
    );
  };

  // const getById = (slug) => {
  //   return instance.get(`${APIs.USERS}/${slug}`, {
  //     headers: {
  //       access_token: getToken("access_token"),
  //     },
  //   });
  // };

const update = (id, payload) => {
    return instance.put(`${APIs.USERS}/${id}`, payload, {
      headers: {
        access_token: getToken("access_token"),
      },
    });
  };

  
// const changeStatus = (id, payload) => {
//     return instance.patch(`${APIs.USERS}/${id}/status`, payload, {
//       headers: {
//         access_token: getToken("access_token"),
//       },
//     });
//   };
  
  

const UserServices = {
    create ,
    list,
    // changeStatus,
     update,
    //  getById
};
export default UserServices;