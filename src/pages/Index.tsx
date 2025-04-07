
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    
    if (user) {
      navigate("/"); // Keep on dashboard if already logged in
    } else {
      navigate("/login"); // Redirect to login
    }
  }, [navigate]);
  
  return null; // This component doesn't render anything
};

export default Index;
