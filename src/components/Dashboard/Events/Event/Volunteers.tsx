import { Card, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star } from "lucide-react";
import { useState } from "react";
import AddReward from "../AddReward";

interface AssignedTask {
  user: {
    id: number;
    email: string;
    role: string;
    charity_id?: number | null;
    volunteer?: {
      id: number;
      full_name: string;
      phone: string;
      address: string;
      points: number;
      user: number;
    } | null;
  };
  task: {
    id: number;
    task_name: string;
    description: string;
    volunteer_limit: number;
    event: number;
  };
  assigned_date: string;
}



export default function Volunteers({className, volunteers}: {className: string, volunteers: AssignedTask[]}) {
  const [showForm, setShowForm] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const handleReward = (userId: number): void => {
    setUserId(userId)
    setShowForm(true)
  };

  return (
    <Card className={`p-4 w-[90%] mx-auto ${className}`}>
      <CardHeader className="font-semibold text-center">
        Assigned Volunteer Tasks
      </CardHeader>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User Email</TableHead>
              <TableHead>Volunteer Name</TableHead>
              <TableHead>Task Name</TableHead>
              <TableHead>Assigned Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volunteers.map((task) => (
              <TableRow key={task.user.id + "-" + task.task.id}>
                <TableCell className="font-medium">{task.user.email}</TableCell>
                <TableCell>{task.user.volunteer ? task.user.volunteer.full_name : "N/A"}</TableCell>
                <TableCell>{task.task.task_name}</TableCell>
                <TableCell>{task.assigned_date}</TableCell>
                <TableCell>
                  <Star  size={16} className="cursor-pointer" onClick={() => handleReward(task.user.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showForm && userId && (
        <AddReward closeForm={()=>setShowForm(false)} user_id={userId!} />
      )}
    </Card>
  );
}
