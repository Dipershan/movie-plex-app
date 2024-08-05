import { instance } from "../utils/axios";
import { APIs } from "../constants";
import { getToken } from "../utils/storage";

const create = (payload) => {
  return instance.post(APIs.USERS, payload, {
    headers: {
      access_token: getToken("access_token"),
      "Content-Type": "multipart/form-data",
    },
  });
};

const list = (limit, page) => {
  
  return instance.get(
    `${APIs.USERS}?limit=${limit}&page=${page}`,
    {
      headers: {
        access_token: getToken("access_token"),
      },
    }
  );
};

const getById = (id) => {
  return instance.get(`${APIs.USERS}/${id}`, {
    headers: {
      access_token: getToken("access_token"),
    },
  });
};

const update = (id, payload) => {
  return instance.put(`${APIs.USERS}/${id}`, payload, {
    headers: {
      access_token: getToken("access_token"),
    
    },
  });
};

// Uncomment and use if needed
// const changeStatus = (id, payload) => {
//   return instance.patch(`${APIs.USERS}/${id}/status`, payload, {
//     headers: {
//       access_token: getToken("access_token"),
//     },
//   });
// };

const UserServices = {
  create,
  list,
  getById,
  update,
  // deleteUser,
  // changeStatus,
};

export default UserServices;
