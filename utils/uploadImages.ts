/* eslint-disable prettier/prettier */
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../configs/cloudinary';

export const uploadImages = async (data: any) => {
  cloudinary.config(config);

  const files = data;
  try {
    const uploadedFiles = await Promise.all(
      files.map(async (file: string) => {
        const result = await cloudinary.uploader.upload(file);
        const image = { url: result.secure_url, id: result.public_id };
        return image;
      }),
    );

    return uploadedFiles;
  } catch (error) {
    console.error(error);
    return [];
  }
};

type Image = {
  id: string;
  url: string;
};

export const deleteImages = async (images: Image[]) => {
  cloudinary.config(config);

  if (images.length) {
    images.forEach((img) => {
      cloudinary.uploader.destroy(img.id);
    });
  }
};
