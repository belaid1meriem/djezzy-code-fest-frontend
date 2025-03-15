import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StockItem } from "@/models/Stock";
import { FC } from "react";
import axios from "axios";
import { toast } from "sonner";

const stockItemSchema = z.object({
  quantity: z.number().min(0, "Quantity cannot be negative"),
});

interface Props {
  closeEvent: () => void;
  item: StockItem;
  setStock: React.Dispatch<React.SetStateAction<StockItem[]>>;
}

const PatchStockItemForm: FC<Props> = ({ closeEvent, item, setStock }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(stockItemSchema),
    defaultValues: {
      quantity: item.quantity,
    },
  });

  const onSubmit = async (data: { quantity: number}) => {
    console.log("Updated Stock Item:", data);
    try {
        const _data: {charity_id: number, product_id: number, quantity: number} = {
            charity_id: item.charity,
            product_id: item.product.id,
            quantity: data.quantity,
        };
        const res = await axios.patch(import.meta.env.VITE_BACKEND+'/events/stocks/update/', _data ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
        })
        setStock((prev) =>
          prev.map((stockItem) =>
            stockItem.id === item.id ? { ...stockItem, quantity: data.quantity } : stockItem
          )
        );
        toast.success("Stock item updated successfully!");
        
    }
    catch (error) {
        console.error(error);
        toast.error("Failed to update stock item. Please try again.");
    }
    finally{
        closeEvent();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-sm shadow-lg rounded-xl p-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-center">
            Update Stock Item
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" {...register("quantity", { valueAsNumber: true })} />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" className="w-1/2 mr-2" onClick={closeEvent}>
                Close
              </Button>
              <Button type="submit" className="w-1/2" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatchStockItemForm;
