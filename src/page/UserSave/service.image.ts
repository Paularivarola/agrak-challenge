import axios from "axios";

export const ImageService = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      "https://65dcd917e7edadead7ecfc5c.mockapi.io/images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.url;
  },
};
