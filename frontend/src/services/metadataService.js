import API from "./api";

export const getMetadata = async () => {
  const response = await API.get("/metadata");
  return response.data;
};