import { useEffect, useState } from "react";
import axios from "axios";
import { StockItem } from "@/models/Stock";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader } from "../../ui/card";
import { Pencil } from "lucide-react";
import PatchStockItemForm from "./PatchStockItemForm";
import { toast } from "sonner";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function General() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStock = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND + "/events/stocks/" +
            JSON.parse(localStorage.getItem("user")!).charity_id +
            "/",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access"),
            },
          }
        );
        setStock(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch stock data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  // Prepare data for charts
  const labels = stock.map((item) => item.product.name);
  const quantities = stock.map((item) => item.quantity);
  const alertThresholds = stock.map((item) => item.product.seil);
  const getComputedColor = (variable: string) => 
    getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Stock Quantity",
        data: quantities,
        backgroundColor: getComputedColor("--chart-3"),
        borderColor: getComputedColor("--chart-3"),
        borderWidth: 1,
      },
      {
        label: "Alert Threshold",
        data: alertThresholds,
        backgroundColor: getComputedColor("--chart-1"),
        borderColor: getComputedColor("--chart-1"),
        borderWidth: 1,
      },
    ],
  };

  function handleModif(item: StockItem): void {
    setSelectedItem(item);
    setIsFormOpen(true);
  }

  return (
    <div className="flex flex-col gap-6 mb-4 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="flex flex-col items-center bg-background border rounded shadow py-2 px-4 fixed right-4 top-8">
          <p className="font-semibold">Fetching stock data...</p>
        </div>
      )}

      {/* Charts Section */}
      <div className="flex items-center justify-center">
        <Card className="w-2/3 h-auto p-4">
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Stock Levels vs Alert Thresholds",
                },
              },
            }}
          />
        </Card>
      </div>

      {/* Stock Table */}
      <Card className="p-4 w-[90%] mx-auto">
        <CardHeader className="font-semibold text-center">
          Current Stock Levels
        </CardHeader>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Alert Threshold</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stock.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.product.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.product.seil}</TableCell>
                  <TableCell>
                    <Pencil
                      onClick={() => handleModif(item)}
                      className="cursor-pointer h-4 w-4"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit Form */}
      {isFormOpen && selectedItem && (
        <PatchStockItemForm
          setStock={setStock}
          item={selectedItem}
          closeEvent={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default General;
