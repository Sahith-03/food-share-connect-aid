
import { useState } from "react";
import { Eye, Salad, Trash2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FoodItem, deleteFoodDonation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

interface FoodItemDetailsProps {
  item: FoodItem;
}

const FoodItemDetails = ({ item }: FoodItemDetailsProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await deleteFoodDonation(item._id);
      if (success) {
        setOpen(false);
        // Invalidate and refetch foods query to update the UI
        queryClient.invalidateQueries({ queryKey: ['foods'] });
        queryClient.invalidateQueries({ queryKey: ['recentFoods'] });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Eye className="mr-1 h-4 w-4" /> View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{item.foodName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Food Type:</p>
              <p className="text-sm text-muted-foreground">
                {item.foodTag === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Quantity:</p>
              <p className="text-sm text-muted-foreground">{item.quantity}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Expiry Date:</p>
              <p className="text-sm text-muted-foreground">{formatDate(item.expiryDate)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Pickup Address:</p>
              <p className="text-sm text-muted-foreground">{item.address}</p>
            </div>
          </div>
          
        </div>
        <DialogFooter className="flex justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isDeleting}>
                <Salad className="mr-1 h-4 w-4" /> Collect
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this food donation.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Collecting..." : "Collect"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FoodItemDetails;
