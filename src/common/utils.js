export const UPLOAD_IMAGE_FILE = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'];
export const UPLOAD_IMAGE_FILE_FORMAT = ['.png', '.jpg', '.jpeg', '.bmp'];

export const checkImageFileUpload = (file) => {
  const type = file.type;
  const name = file.name;
  const format = name.substring(name.lastIndexOf('.'), name.length);
  return (
    UPLOAD_IMAGE_FILE.includes(type) &&
    format &&
    UPLOAD_IMAGE_FILE_FORMAT.includes(format.toLowerCase())
  );
};

export const formatNumberVietnamese = (number) => {
  if (typeof number === 'undefined') {
    return '';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
