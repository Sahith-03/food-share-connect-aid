
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type FoodDonation = {
  id: number;
  foodName: string;
  quantity: string;
  foodType: string;
  expiryDate: string;
  address: string;
  donationDate: string;
};

const FoodItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  
  useEffect(() => {
    // Load donations from localStorage
    const storedDonations = localStorage.getItem("foodDonations");
    if (storedDonations) {
      setDonations(JSON.parse(storedDonations));
    }
  }, []);

  // Filter items based on search and type filter
  const filteredItems = donations.filter(item => {
    const matchesSearch = item.foodName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || item.foodType === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    
    if (dateString.includes("T")) {
      // Handle ISO format (from donationDate)
      return new Date(dateString).toLocaleDateString();
    }
    
    // Handle YYYY-MM-DD format (from expiryDate)
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Donated Food Items</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={typeFilter}
            onValueChange={setTypeFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="veg">Vegetarian</SelectItem>
              <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(item => (
          <Card key={item.id} className="food-donation-card">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{item.foodName}</span>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  item.foodType === 'veg' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {item.foodType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <span className="text-sm font-medium">{item.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expiry Date:</span>
                  <span className="text-sm font-medium">{formatDate(item.expiryDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Donated On:</span>
                  <span className="text-sm font-medium">{formatDate(item.donationDate)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">No food items found</h3>
            <p className="text-muted-foreground">
              {donations.length === 0 
                ? "No food donations have been submitted yet." 
                : "Try adjusting your search or filters"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItems;
