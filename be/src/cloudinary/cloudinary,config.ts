import {v2 as cloudinary} from 'cloudinary';

const CLOUDINARY_CLOUD_NAME = "dmdfkhwfm"
const CLOUDINARY_API_KEY = "811526895955428"
const CLOUDINARY_API_SECRET = "yQE6cl11rJMbl2ZEknAOV_n-pAI"

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export { cloudinary };