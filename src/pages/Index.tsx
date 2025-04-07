
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    
    if (userString) {
      navigate("/"); // Direct to dashboard for either role
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);
  
  return null; // This component doesn't render anything
};

export default Index;
