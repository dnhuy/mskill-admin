import axios from 'axios';

export const getUploadImageUrl = (data) => {
  return axios.post('/s3/preSignedUrl', data);
};

export async function uploadToS3(url, file) {
  const option = {
    method: 'PUT',
    headers: {
      'content-type': file.type,
      'x-amz-acl': 'public-read',
    },
    url,
    data: file,
  };
  const newAxios = axios.create();
  newAxios(option);
}
