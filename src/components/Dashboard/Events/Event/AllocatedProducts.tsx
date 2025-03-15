import { Card, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

interface AllocatedStockItem {
  id: number;
  event: number;
  product: number;
  allocated_quantity: number;
}

const allocatedStock: AllocatedStockItem[] = [
  {
    id: 1,
    event: 1,
    product: 2,
    allocated_quantity: 20,
  },
  {
    id: 2,
    event: 1,
    product: 3,
    allocated_quantity: 5,
  },
];

export default function AllocatedProducts({className}: {className: string}) {
  const handleEdit = (item: AllocatedStockItem): void => {
    console.log("Edit item:", item);
  };

  return (
    <Card className={`p-4 w-[90%] mx-auto ${className}`}>
      <CardHeader className="font-semibold text-center">
        Allocated Stock Levels
      </CardHeader>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Allocated Quantity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocatedStock.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.allocated_quantity}</TableCell>
                <TableCell>
                  <Pencil
                    onClick={() => handleEdit(item)}
                    className="cursor-pointer h-4 w-4"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
