
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "donor"
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration - would connect to backend in real implementation
    setTimeout(() => {
      toast.success("Registration successful! Please login.");
      navigate("/login");
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-food-green-50 to-food-green-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-food-green-800">FoodShare Connect</h1>
          <p className="text-food-green-600">Join our community to share food and reduce waste</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Fill in your details to register</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  type="text" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel" 
                  placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>I am a</Label>
                <RadioGroup 
                  value={formData.role} 
                  onValueChange={handleRoleChange}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="donor" id="donor" />
                    <Label htmlFor="donor">Donor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recipient" id="recipient" />
                    <Label htmlFor="recipient">Recipient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="volunteer" id="volunteer" />
                    <Label htmlFor="volunteer">Volunteer</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-food-green-600 hover:bg-food-green-700" type="submit" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register"}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-food-green-600 hover:text-food-green-800 font-medium">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
