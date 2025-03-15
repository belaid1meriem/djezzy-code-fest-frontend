import { Card, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

interface VolunteerTask {
  id: number;
  task_name: string;
  description: string;
  volunteer_limit: number;
  event: number;
}

const volunteerTasks: VolunteerTask[] = [
  {
    id: 3,
    task_name: "Dishwashing & Cleaning",
    description: "Wash dishes, clean tables, and maintain hygiene in the kitchen and dining area.",
    volunteer_limit: 7,
    event: 2,
  },
  {
    id: 4,
    task_name: "Table Organizing & Setup",
    description: "Arrange tables and chairs",
    volunteer_limit: 3,
    event: 2,
  },
  {
    id: 6,
    task_name: "Placing Food on Tables",
    description: "Distribute meals on tables before people arrive",
    volunteer_limit: 5,
    event: 2,
  },
];

export default function Tasks({className}: {className: string}) {
  const handleEdit = (task: VolunteerTask): void => {
    console.log("Edit task:", task);
  };

  return (
    <Card className={`p-4 w-[90%] mx-auto ${className}`}>
      <CardHeader className="font-semibold text-center">
        Event Tasks
      </CardHeader>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Task Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Volunteer Limit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volunteerTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.task_name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.volunteer_limit}</TableCell>
                <TableCell>
                  <Pencil
                    onClick={() => handleEdit(task)}
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
