import axios from "axios";

const instance = axios.create({
  baseURL: "https://mismisi.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.defaults.validateStatus = () => true;

export async function MisMisi(message) {
  if (!message) {
    throw new Error("'message' is required");
  }

  const { data } = await instance({
    params: {
      message,
    },
  });

  return data;
}
