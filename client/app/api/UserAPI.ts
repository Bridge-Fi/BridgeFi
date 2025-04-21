import axios from "./axios";

export const UsesAPI = {
  async register(userData: any) {
    console.log(userData);
    const response = await axios.post("/users/register", userData);
    return response;
  },
};
