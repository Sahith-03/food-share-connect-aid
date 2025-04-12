import axios from "axios";
import { toast } from "sonner";

// Define types for API responses and requests
export interface FoodItem {
  _id: string;
  foodName: string;
  quantity: number;
  foodTag: string;
  expiryDate: string;
  address: string;
  donationDate: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    name: string;
    email: string;
    _id: string;
  };
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  number: string;
  password: string;
}

export interface FoodDonationRequest {
  foodName: string;
  foodTag: string;
  quantity: number;
  expiryDate: string;
  address: string;
  email: string;
}

const API_BASE_URL = "https://food-donation-backend-9z3j.onrender.com/api"; // Replace with your actual API base URL
// const API_BASE_URL = "http://localhost:3000/api"; // Replace with your actual API base URL
// Error handling function
const handleApiError = (error: any): string => {
  console.error("API Error:", error);
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return "Something went wrong. Please try again.";
};

// Get all food donations
export const getAllFoods = async (): Promise<FoodItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/allfoods`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("All-foods:",data)
    return data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    toast.error(errorMessage);
    return [];
  }
};

// Donate food
export const donateFood = async (formData: FoodDonationRequest): Promise<boolean> => {
  try {
      const response = await axios.post(`${API_BASE_URL}/fooddonation`, {formData});
      console.log(response.data);
      toast.success("Successfully donated food!");
      return true;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return false;
    }
};

// Delete food donation
export const deleteFoodDonation = async (id: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You must be logged in to delete donations");
      return false;
    }
    
    const response = await fetch(`${API_BASE_URL}/fooddonation/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    toast.success("Food donation deleted successfully");
    return true;
  } catch (error) {
    const errorMessage = handleApiError(error);
    toast.error(errorMessage);
    return false;
  }
};

// User login
export const login = async (credentials: LoginRequest): Promise<LoginResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    const userData = {
      user:{
        name:data.existingUser.name,
        email: data.existingUser.email,
        _id: data.existingUser._id
      },
      token: data.token
    }
    return userData;
  } catch (error) {
    const errorMessage = handleApiError(error);
    toast.error(errorMessage);
    return null;
  }
};

// User registration
export const register = async (userData: RegisterRequest): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return true;
  } catch (error) {
    const errorMessage = handleApiError(error);
    toast.error(errorMessage);
    return false;
  }
};
