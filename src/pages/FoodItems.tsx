
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FoodItem, getAllFoods } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import FoodItemDetails from "@/components/FoodItemDetails";

const FoodItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Use React Query to fetch and cache food items
  const { data: foodItems = [], isLoading, error, refetch } = useQuery({
    queryKey: ['foods'],
    queryFn: getAllFoods
  });

  // Filter items based on search and type filter
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.foodName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || item.foodTag === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };
  
  // Format quantity to display appropriately
  const formatQuantity = (quantity: number | string) => {
    // Handle case where API might return string despite our interface
    const numQuantity = typeof quantity === 'string' ? parseFloat(quantity) : quantity;
    
    if (isNaN(numQuantity)) {
      return 'N/A';
    }
    
    // Display quantity with at most 1 decimal place when needed
    return Number.isInteger(numQuantity) ? numQuantity.toString() : numQuantity.toFixed(1);
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
              <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <p className="text-lg font-medium">Loading food donations...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <p className="text-lg font-medium text-red-500">Error loading donations</p>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        </div>
      )}
      
      {!isLoading && !error && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(item => (
            <Card key={item._id} className="food-donation-card">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{item.foodName}</span>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    item.foodTag === 'veg' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {item.foodTag === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <span className="text-sm font-medium">{formatQuantity(item.quantity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expiry Date:</span>
                    <span className="text-sm font-medium">{formatDate(item.expiryDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Address</span>
                    <span className="text-sm font-medium">{item.address.substring(0, 30)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <FoodItemDetails item={item} />
              </CardFooter>
            </Card>
          ))}
          
          {filteredItems.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium">No food items found</h3>
              <p className="text-muted-foreground">
                {foodItems.length === 0 
                  ? "No food donations have been submitted yet." 
                  : "Try adjusting your search or filters"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodItems;
