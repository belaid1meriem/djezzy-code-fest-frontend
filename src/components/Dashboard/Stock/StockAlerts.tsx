import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface StockAlert {
  product_id: number;
  product_name: string;
  current_quantity: number;
  threshold: number;
  alert: string;
  status: number;
}

const StockAlerts = () => {
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isStockGood, setIsStockGood] = useState<boolean>(false);

  useEffect(() => {
    const fetchStockAlerts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND+'/events/stock-alert/'+
          JSON.parse(localStorage.getItem("user")!).charity_id 
          +'/',
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access"),
            },
          }
        );

        if (response.status === 200) {
          setIsStockGood(true);
        } else {
          setIsStockGood(false);
        }
        setAlerts(response.data.alerts || []);
      } catch (error: any) {
        if (error.response?.status === 409) {
          setAlerts(error.response.data.alerts);
        } else {
          setError("Failed to fetch stock alerts.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStockAlerts();
  }, []);

  return (
    <Card className="w-[90%] mx-auto mt-4 p-4 shadow-md">
      <CardHeader className="font-semibold text-center">
        Stock Alerts
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="text-center text-gray-600">Loading alerts...</div>
        )}

        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}

        {!loading && !error && isStockGood && (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>All products are stocked in good quantities.</span>
          </div>
        )}

        {!loading && !error && alerts.length > 0 && (
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li key={alert.product_id} className="p-3 bg-red-100 border border-red-400 rounded-md flex items-center gap-3">
                <AlertTriangle className="text-red-500 w-5 h-5" />
                <span className="text-red-700">{alert.alert}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default StockAlerts;
