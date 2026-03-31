import crypto from 'crypto';

const getCloudinaryConfig = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables are missing');
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    folder: process.env.CLOUDINARY_FOLDER || 'foodly'
  };
};

const buildSignature = (timestamp, folder, apiSecret) => {
  const params = folder
    ? `folder=${folder}&timestamp=${timestamp}${apiSecret}`
    : `timestamp=${timestamp}${apiSecret}`;

  return crypto.createHash('sha1').update(params).digest('hex');
};

export const uploadImageToCloudinary = async (imageData) => {
  const { cloudName, apiKey, apiSecret, folder } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = buildSignature(timestamp, folder, apiSecret);

  const formData = new FormData();
  formData.append('file', imageData);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);

  if (folder) {
    formData.append('folder', folder);
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || 'Cloudinary upload failed');
  }

  const data = await response.json();

  return {
    url: data.secure_url,
    publicId: data.public_id
  };
};
