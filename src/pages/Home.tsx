
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FoodItem, getAllFoods } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Package, ChefHat, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FoodItemDetails from "@/components/FoodItemDetails";

const Home = () => {
  const navigate = useNavigate();
  
  // Fetch recent food donations
  const { data: foodItems = [], isLoading } = useQuery({
    queryKey: ['recentFoods'],
    queryFn: getAllFoods
  });
  
  // Get the most recent 3 donations
  const recentDonations = foodItems.slice(0, 3);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative">
        <div className="text-center space-y-4 py-12 px-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            FoodShare Connect
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Reducing food waste and fighting hunger through community donations.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/donate")}
            >
              Donate Food
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/food-items")}
            >
              Browse Donations
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <ChefHat className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>1. Donate Food</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                List excess food items you'd like to donate using our simple form.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>2. Connect</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Food items are visible to community members and organizations who need them.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>3. Pick Up</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Arrangements are made for pickup, ensuring food reaches those in need.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Donations</h2>
          <Button variant="ghost" onClick={() => navigate("/food-items")}>
            View All
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading recent donations...</p>
          </div>
        ) : recentDonations.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {recentDonations.map((item) => (
              <Card key={item._id} className="overflow-hidden">
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
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Expires: {formatDate(item.expiryDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{item.address.substring(0, 30)}...</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <FoodItemDetails item={item} />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <CardDescription>No donations available yet.</CardDescription>
              <Button 
                className="mt-4" 
                onClick={() => navigate("/donate")}
              >
                Make a Donation
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Home;
