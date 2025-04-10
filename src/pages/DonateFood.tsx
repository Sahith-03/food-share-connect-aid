
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { donateFood } from "@/services/api";
import { useNavigate } from "react-router-dom";

const DonateFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    foodType: "veg",
    expiryDate: "",
    address: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, foodType: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to donate food");
      navigate("/login");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await donateFood(formData);
      
      if (success) {
        toast.success("Food donation submitted successfully!");
        setFormData({
          foodName: "",
          quantity: "",
          foodType: "veg",
          expiryDate: "",
          address: ""
        });
        
        // Navigate to the food items page to see all donations
        navigate("/food-items");
      }
    } catch (error) {
      console.error("Donation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Donate Food</h1>
      <p className="text-muted-foreground">Fill out the form below to donate food items to those in need.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Food Donation Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="foodName">Food Name</Label>
              <Input
                id="foodName"
                name="foodName"
                placeholder="e.g., Rice, Canned Beans, Fresh Vegetables"
                value={formData.foodName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                placeholder="e.g., 5 kg, 10 packets, 3 boxes"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Food Type</Label>
              <RadioGroup
                value={formData.foodType}
                onValueChange={handleRadioChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="veg" id="veg" />
                  <Label htmlFor="veg">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-veg" id="non-veg" />
                  <Label htmlFor="non-veg">Non-Vegetarian</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter the address where the food can be picked up"
                value={formData.address}
                onChange={handleChange}
                className="min-h-[100px]"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-food-green-600 hover:bg-food-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Donation"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonateFood;
