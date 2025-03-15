import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

type ProductFormData = {
  charity_id: number;
  product: {
    name: string;
    description: string;
    category: string;
    seil: number;
  };
  quantity: number;
};

const CATEGORY_CHOICES = [
  { value: "aliments_de_base", label: "Aliments de base" },
  { value: "produits_laitiers", label: "Produits laitiers" },
  { value: "boissons", label: "Boissons" },
  { value: "viandes_proteines", label: "Viandes & Protéines" },
  { value: "cereales_legumineuses", label: "Céréales & Légumineuses" },
  { value: "fruits_legumes", label: "Fruits & Légumes" },
  { value: "epices_condiments", label: "Épices & Condiments" },
  { value: "hygiene_nettoyage", label: "Hygiène & Nettoyage" },
  { value: "huiles_cuisson", label: "Huiles & Matières grasses" },
  { value: "pain_patisseries", label: "Pain & Pâtisseries" },
  { value: "desserts_sucreries", label: "Desserts & Sucreries" },
  { value: "autre", label: "Autre" },
];

export default function AddStock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit = async (data: ProductFormData) => {
    try {
      data.charity_id = JSON.parse(localStorage.getItem("user")!).charity_id;
      await axios.post(import.meta.env.VITE_BACKEND+'/events/stocks/add/', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      toast.success("Product added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <Card className="w-full max-w-md p-6 mx-auto shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Add Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="product_name">Product Name</Label>
            <Input
              id="product_name"
              {...register("product.name", { required: "Product name is required" })}
            />
            {errors.product?.name && (
              <p className="text-sm text-red-500">{errors.product.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="product_description">Description</Label>
            <Textarea
              id="product_description"
              {...register("product.description", { required: "Description is required" })}
            />
            {errors.product?.description && (
              <p className="text-sm text-red-500">{errors.product.description.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="product_category">Category</Label>
            <select
              id="product_category"
              {...register("product.category", { required: "Category is required" })}
              className="w-full border rounded-md p-2"
            >
              {CATEGORY_CHOICES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.product?.category && (
              <p className="text-sm text-red-500">{errors.product.category.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="product_seil">Alert Threshold</Label>
            <Input
              id="product_seil"
              type="number"
              {...register("product.seil", { required: "Seil is required", min: 1 })}
            />
            {errors.product?.seil && (
              <p className="text-sm text-red-500">{errors.product.seil.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", { required: "Quantity is required", min: 1 })}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <Button type="submit" className="flex-1">
              Add Product
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
