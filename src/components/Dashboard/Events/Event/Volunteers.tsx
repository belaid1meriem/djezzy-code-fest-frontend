import { Card, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Star } from "lucide-react";

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

const assignedTasks: AssignedTask[] = [
  {
    user: {
      id: 2,
      email: "mr_maamar1@esi.dz",
      role: "volunteer",
      charity_id: null,
      volunteer: {
        id: 1,
        full_name: "Rofieda M",
        phone: "1234567890",
        address: "Baraki - Alger",
        points: 0,
        user: 2,
      },
    },
    task: {
      id: 2,
      task_name: "Dishwashing & Cleaning",
      description: "Wash dishes, clean tables, and maintain hygiene in the kitchen and dining area.",
      volunteer_limit: 4,
      event: 1,
    },
    assigned_date: "2025-04-25",
  },
  {
    user: {
      id: 3,
      email: "asbarroufaida@email.com",
      role: "volunteer",
      charity_id: 1,
      volunteer: null,
    },
    task: {
      id: 2,
      task_name: "Dishwashing & Cleaning",
      description: "Wash dishes, clean tables, and maintain hygiene in the kitchen and dining area.",
      volunteer_limit: 4,
      event: 1,
    },
    assigned_date: "2025-04-25",
  },
  {
    user: {
      id: 3,
      email: "asbarroufaida@email.com",
      role: "volunteer",
      charity_id: 1,
      volunteer: null,
    },
    task: {
      id: 7,
      task_name: "Water Distribution",
      description: "Ensure every table has water",
      volunteer_limit: 2,
      event: 1,
    },
    assigned_date: "2025-04-25",
  },
];

export default function Volunteers({className, volunteers}: {className: string, volunteers: AssignedTask[]}) {
  const handleEdit = (task: AssignedTask): void => {
    console.log("Edit assigned task:", task);
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
                  <Star  size={16} className="cursor-pointer" onClick={() => 1+1} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
