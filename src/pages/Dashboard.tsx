
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingBag, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">523</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+4 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Food Items Available</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">16 expiring soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distributions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Overview of the most recent food donations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { donor: "Fresh Foods Market", item: "Fresh Vegetables", quantity: "25 kg", date: "2023-04-05", status: "Available" },
                { donor: "Bakery Delights", item: "Bread and Pastries", quantity: "40 units", date: "2023-04-04", status: "Available" },
                { donor: "Farm Fresh Co-op", item: "Fruits", quantity: "15 kg", date: "2023-04-03", status: "Reserved" },
                { donor: "Local Restaurant", item: "Prepared Meals", quantity: "20 servings", date: "2023-04-02", status: "Distributed" },
                { donor: "Grocery Outlet", item: "Canned Goods", quantity: "100 units", date: "2023-04-01", status: "Distributed" },
              ].map((donation, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{donation.item}</div>
                    <div className="text-sm text-muted-foreground">from {donation.donor}</div>
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
            <CardTitle>Distribution Statistics</CardTitle>
            <CardDescription>Food categories distributed this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Fresh Produce</div>
                  <div className="font-medium">45%</div>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Bakery Items</div>
                  <div className="font-medium">30%</div>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Canned Goods</div>
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
    </div>
  );
};

export default Dashboard;
