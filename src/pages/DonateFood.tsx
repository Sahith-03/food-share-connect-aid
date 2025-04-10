
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const DonateFood = () => {
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - would connect to backend in real implementation
    setTimeout(() => {
      // In a real app, this would save to a database
      const existingDonations = JSON.parse(localStorage.getItem("foodDonations") || "[]");
      const newDonation = {
        id: Date.now(),
        ...formData,
        donationDate: new Date().toISOString()
      };
      
      localStorage.setItem("foodDonations", JSON.stringify([...existingDonations, newDonation]));
      
      toast.success("Food donation submitted successfully!");
      setFormData({
        foodName: "",
        quantity: "",
        foodType: "veg",
        expiryDate: "",
        address: ""
      });
      setIsSubmitting(false);
    }, 1000);
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
