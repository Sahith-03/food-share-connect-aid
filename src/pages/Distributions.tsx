
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Check } from "lucide-react";
import { toast } from "sonner";

const mockDistributions = [
  { id: 1, foodItem: "Fresh Vegetables", recipient: "Community Center", quantity: "10 kg", date: "2023-04-03", volunteer: "Sarah Johnson", donor: "Local Farm" },
  { id: 2, foodItem: "Bread", recipient: "Homeless Shelter", quantity: "15 loaves", date: "2023-04-02", volunteer: "Mike Peters", donor: "City Bakery" },
  { id: 3, foodItem: "Canned Soup", recipient: "Food Pantry", quantity: "25 cans", date: "2023-04-01", volunteer: "Emma Davis", donor: "Super Mart" },
  { id: 4, foodItem: "Rice", recipient: "Family Support Center", quantity: "20 kg", date: "2023-03-30", volunteer: "James Wilson", donor: "Wholesale Foods" },
  { id: 5, foodItem: "Fresh Fruit", recipient: "Children's Home", quantity: "12 kg", date: "2023-03-29", volunteer: "Lisa Brown", donor: "Organic Farms" },
];

const mockFoodItems = [
  { id: 1, name: "Fresh Vegetables", donor: "Local Farm", quantity: "15 kg", status: "available" },
  { id: 2, name: "Bread", donor: "City Bakery", quantity: "20 loaves", status: "available" },
  { id: 3, name: "Canned Beans", donor: "Super Mart", quantity: "50 cans", status: "available" },
];

const mockRecipients = [
  { id: 1, name: "Community Center", address: "123 Main St" },
  { id: 2, name: "Homeless Shelter", address: "456 Oak Ave" },
  { id: 3, name: "Food Pantry", address: "789 Pine Rd" },
  { id: 4, name: "Family Support Center", address: "321 Elm St" },
];

const Distributions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>("donor");

  const [newDistribution, setNewDistribution] = useState({
    foodItemId: "",
    recipientId: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0]
  });

  // Get user role from localStorage
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserRole(user.role);
    }
  }, []);

  // Filter distributions based on role
  const filteredDistributions = mockDistributions.filter(dist => {
    const matchesSearch = dist.foodItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dist.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dist.donor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || dist.date === dateFilter;
    
    if (userRole === "donor") {
      // Donors see distributions of their donated items
      // In a real app, would filter by donor ID - here we just show all
      return matchesSearch && matchesDate;
    } else {
      // Recipients see donations they've received
      // In a real app, would filter by recipient ID - here we just show all
      return matchesSearch && matchesDate;
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDistribution(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewDistribution(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to the backend
    console.log("New distribution:", newDistribution);
    toast.success("Distribution record added successfully!");
    setIsDialogOpen(false);
    setNewDistribution({
      foodItemId: "",
      recipientId: "",
      quantity: "",
      date: new Date().toISOString().split("T")[0]
    });
  };

  const getPageTitle = () => {
    return userRole === "donor" ? "Distribution History" : "My Allocations";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
        
        {/* Only donors can record distributions */}
        {userRole === "donor" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-food-green-600 hover:bg-food-green-700">
                <Check className="mr-2 h-4 w-4" />
                Record Distribution
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Food Distribution</DialogTitle>
                <DialogDescription>Fill in the details to record a new food distribution.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="foodItemId">Food Item</Label>
                    <Select
                      value={newDistribution.foodItemId}
                      onValueChange={(value) => handleSelectChange("foodItemId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a food item" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockFoodItems.map(item => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name} ({item.quantity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientId">Recipient</Label>
                    <Select
                      value={newDistribution.recipientId}
                      onValueChange={(value) => handleSelectChange("recipientId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockRecipients.map(recipient => (
                          <SelectItem key={recipient.id} value={recipient.id.toString()}>
                            {recipient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      value={newDistribution.quantity}
                      onChange={handleChange}
                      placeholder="e.g., 10 kg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Distribution Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newDistribution.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-food-green-600 hover:bg-food-green-700">Record Distribution</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={userRole === "donor" ? "Search distributions..." : "Search allocations..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full sm:w-[180px]"
          />
        </div>
      </div>
      
      {filteredDistributions.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDistributions.map(dist => (
            <Card key={dist.id} className="food-donation-card">
              <CardHeader>
                <CardTitle>{dist.foodItem}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {userRole === "donor" && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Recipient:</span>
                      <span className="text-sm font-medium">{dist.recipient}</span>
                    </div>
                  )}
                  
                  {userRole === "recipient" && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Donor:</span>
                      <span className="text-sm font-medium">{dist.donor}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <span className="text-sm font-medium">{dist.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm font-medium">{dist.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Distributed by:</span>
                    <span className="text-sm font-medium">{dist.volunteer}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No distributions found</h3>
          <p className="text-muted-foreground">Try adjusting your search or date filter</p>
        </div>
      )}
    </div>
  );
};

export default Distributions;
