
import { toast } from "sonner";

// Define types for API responses and requests
export interface FoodItem {
  _id: string;
  foodName: string;
  quantity: number; // Changed from string to number
  foodType: string;
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
  quantity: number; // Changed from string to number
  expiryDate: string;
  address: string;
  email: string;
}

const API_BASE_URL = "https://food-donation-backend-9z3j.onrender.com/api";

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
    return data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    toast.error(errorMessage);
    return [];
  }
};

// Donate food
export const donateFood = async (foodData: FoodDonationRequest): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error("You must be logged in to donate food");
      return false;
    }
    
    const response = await fetch(`${API_BASE_URL}/fooddonation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(foodData)
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
    return data;
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
