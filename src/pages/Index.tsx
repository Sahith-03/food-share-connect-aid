
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    
    if (userString) {
      const user = JSON.parse(userString);
      // Redirect based on user role
      if (user.role === "donor") {
        navigate("/food-items"); // Donors primarily manage food items
      } else if (user.role === "recipient") {
        navigate("/distributions"); // Recipients primarily track distributions
      } else {
        navigate("/"); // Default dashboard for other roles
      }
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);
  
  return null; // This component doesn't render anything
};

export default Index;
