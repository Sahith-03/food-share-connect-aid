
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingBag, BarChart3, Truck, MapPin, Heart, Utensils } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string>("donor"); // Default role
  
  useEffect(() => {
    // Get user role from localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserRole(user.role);
    }
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      {userRole === "donor" ? <DonorDashboard /> : <RecipientDashboard />}
    </div>
  );
};

const DonorDashboard = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recipients Served</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Donations</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">3 expiring soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distributions</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Overview of your most recent food donations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { item: "Fresh Vegetables", quantity: "25 kg", date: "2023-04-05", recipient: "Community Food Bank", status: "Available" },
                { item: "Bread and Pastries", quantity: "40 units", date: "2023-04-04", recipient: "Homeless Shelter", status: "Available" },
                { item: "Fruits", quantity: "15 kg", date: "2023-04-03", recipient: "Children's Home", status: "Reserved" },
                { item: "Prepared Meals", quantity: "20 servings", date: "2023-04-02", recipient: "Senior Center", status: "Distributed" },
                { item: "Canned Goods", quantity: "100 units", date: "2023-04-01", recipient: "Disaster Relief", status: "Distributed" },
              ].map((donation, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{donation.item}</div>
                    <div className="text-sm text-muted-foreground">to {donation.recipient}</div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      donation.status === "Available" 
                        ? "bg-green-100 text-green-800" 
                        : donation.status === "Reserved" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-gray-100 text-gray-800"
                    }`}>
                      {donation.status}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">{donation.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Distribution Categories</CardTitle>
            <CardDescription>Types of food you've donated this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Fresh Produce</div>
                  <div className="font-medium">42%</div>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Bakery Items</div>
                  <div className="font-medium">28%</div>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Canned Goods</div>
                  <div className="font-medium">18%</div>
                </div>
                <Progress value={18} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Prepared Meals</div>
                  <div className="font-medium">12%</div>
                </div>
                <Progress value={12} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const RecipientDashboard = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Items</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">+18 new today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">+4 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Received Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Pickups</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Next: Today at 3PM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Available Food Items</CardTitle>
            <CardDescription>Recently added donations you can request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { donor: "Fresh Foods Market", item: "Fresh Vegetables", quantity: "25 kg", distance: "0.8 mi", expiry: "3 days" },
                { donor: "Bakery Delights", item: "Bread and Pastries", quantity: "40 units", distance: "1.2 mi", expiry: "1 day" },
                { donor: "Farm Fresh Co-op", item: "Fruits", quantity: "15 kg", distance: "2.5 mi", expiry: "4 days" },
                { donor: "Local Restaurant", item: "Prepared Meals", quantity: "20 servings", distance: "0.5 mi", expiry: "Today" },
                { donor: "Grocery Outlet", item: "Canned Goods", quantity: "100 units", distance: "3.2 mi", expiry: "6 months" },
              ].map((donation, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{donation.item}</div>
                    <div className="text-sm text-muted-foreground">from {donation.donor}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {donation.quantity}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      {donation.distance} away · Expires: {donation.expiry}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Food Categories Received</CardTitle>
            <CardDescription>Types of food you've received this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Canned Goods</div>
                  <div className="font-medium">45%</div>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Fresh Produce</div>
                  <div className="font-medium">30%</div>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Bakery Items</div>
                  <div className="font-medium">15%</div>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Prepared Meals</div>
                  <div className="font-medium">10%</div>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
