import axios from "./axios";

export default async function uploader(photo) {
  const formData = new FormData();
  formData.append("photo", photo);

  const res = await axios.post("/upload_photo", formData);

  return res.data;
}
