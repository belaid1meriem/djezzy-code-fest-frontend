import { Card, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CirclePlus } from "lucide-react";
import { useState } from "react";


interface AllocatedStockItem {
  id: number;
  event: number;
  product: number;
  allocated_quantity: number;
}


export default function AllocatedProducts({className, allocatedProducts}: {className: string, allocatedProducts:AllocatedStockItem[]}) {
  const [showForm, setShowForm] = useState(false)
  const handleEdit = (item: AllocatedStockItem): void => {
    console.log("Edit item:", item);
  };

  return (
    <Card className={`p-4 w-[90%] mx-auto ${className}`}>
      <CardHeader className="font-semibold text-center">
        <CirclePlus className="cursor-pointer" onClick={()=> setShowForm(true)} />
        Allocated Stock Levels
      </CardHeader>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Allocated Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocatedProducts.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.allocated_quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
        {/* {showForm && <AddAllocatedProduct closeForm={() => setShowForm(false)} />} */}
    </Card>
  );
}
