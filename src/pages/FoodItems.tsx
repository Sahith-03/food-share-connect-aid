
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const mockFoodItems = [
  { id: 1, name: "Fresh Vegetables", donor: "Local Farm", quantity: "15 kg", expiry: "2023-04-15", status: "available" },
  { id: 2, name: "Bread", donor: "City Bakery", quantity: "20 loaves", expiry: "2023-04-12", status: "available" },
  { id: 3, name: "Canned Beans", donor: "Super Mart", quantity: "50 cans", expiry: "2023-08-10", status: "available" },
  { id: 4, name: "Rice", donor: "Wholesale Foods", quantity: "25 kg", expiry: "2023-12-31", status: "available" },
  { id: 5, name: "Fresh Milk", donor: "Dairy Farm", quantity: "30 liters", expiry: "2023-04-10", status: "distributed" },
  { id: 6, name: "Pasta", donor: "Italian Store", quantity: "40 packs", expiry: "2023-09-20", status: "distributed" },
];

const FoodItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>("donor");
  
  const [newFoodItem, setNewFoodItem] = useState({
    name: "",
    quantity: "",
    expiry: "",
    status: "available"
  });
  
  // Get user role from localStorage
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserRole(user.role);
    }
  }, []);

  // Filter items based on role
  const filteredItems = mockFoodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.donor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    if (userRole === "donor") {
      // Donors only see their own donations
      // In a real app, would filter by donor ID - for now, we'll pretend all items are theirs
      return matchesSearch && matchesStatus;
    } else {
      // Recipients only see available items
      return matchesSearch && matchesStatus && item.status === "available";
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFoodItem(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to the backend
    console.log("New food item:", newFoodItem);
    toast.success("Food item added successfully!");
    setIsDialogOpen(false);
    setNewFoodItem({
      name: "",
      quantity: "",
      expiry: "",
      status: "available"
    });
  };
  
  const getPageTitle = () => {
    return userRole === "donor" ? "My Donations" : "Available Food Items";
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
        
        {/* Only donors can add new food items */}
        {userRole === "donor" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-food-green-600 hover:bg-food-green-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Donation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Donation</DialogTitle>
                <DialogDescription>Fill in the details to add a new food item for donation.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Food Item Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newFoodItem.name}
                      onChange={handleChange}
                      placeholder="e.g., Fresh Vegetables"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      value={newFoodItem.quantity}
                      onChange={handleChange}
                      placeholder="e.g., 20 kg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      type="date"
                      value={newFoodItem.expiry}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <RadioGroup
                      value={newFoodItem.status}
                      onValueChange={(value) => setNewFoodItem(prev => ({ ...prev, status: value }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="available" id="available" />
                        <Label htmlFor="available">Available</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reserved" id="reserved" />
                        <Label htmlFor="reserved">Reserved</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-food-green-600 hover:bg-food-green-700">Add Donation</Button>
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
            placeholder={userRole === "donor" ? "Search my donations..." : "Search available food..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              {userRole === "donor" && (
                <SelectItem value="distributed">Distributed</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(item => (
          <Card key={item.id} className="food-donation-card">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{item.name}</span>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status === 'available' ? 'Available' : 'Distributed'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Donor:</span>
                  <span className="text-sm font-medium">{item.donor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <span className="text-sm font-medium">{item.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expiry:</span>
                  <span className="text-sm font-medium">{item.expiry}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {userRole === "donor" ? (
                <Button variant="outline" className="w-full">View Details</Button>
              ) : (
                <Button className="w-full bg-food-green-600 hover:bg-food-green-700">Request Item</Button>
              )}
            </CardFooter>
          </Card>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">No food items found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItems;
