import api from "@/lib/api";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

// Register
export const registerUser = (data: RegisterPayload) => {
  return api.post("/auth/register", data);
};

// Login
export const loginUser = (data: LoginPayload) => {
  return api.post("/auth/login", data);
};

// Get logged-in user
export const getUser = () => {
  return api.get("/auth/user");
};
