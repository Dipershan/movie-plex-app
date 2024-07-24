import { instance } from '../utils/axios';
import { APIs } from '../constants';
import { getToken } from '../utils/storage';

const getProfile = () => {
  const url = APIs.PROFILE;
  console.log('Fetching profile from:', url);
  return instance.get(url, {
    headers: {
      access_token: getToken('access_token'),
    },
  });
};

const updateProfile = (payload) => {
  const url = APIs.PROFILE;
  console.log('Updating profile at:', url, 'with payload:', payload);
  return instance.put(url, payload, {
    headers: {
      access_token: getToken('access_token'),
    },
  });
};

const ProfileServices = {
  getProfile,
  updateProfile,
};

export default ProfileServices;


// import { instance } from '../utils/axios';
// import { APIs } from '../constants';
// import { getToken } from '../utils/storage';

// const getProfile = () => {
//   return instance.get(APIs.PROFILE, {
//     headers: {
//       access_token: getToken('access_token'),
//     },
//   });
// };

// const updateProfile = (payload) => {
//   return instance.put(APIs.PROFILE, payload, {
//     headers: {
//       access_token: getToken('access_token'),
//     },
//   });
// };

// const ProfileServices = {
//   getProfile,
//   updateProfile,
// };

// export default ProfileServices;

