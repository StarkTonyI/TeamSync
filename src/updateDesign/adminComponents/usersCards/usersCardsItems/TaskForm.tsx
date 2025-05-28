
import React from "react";
import { Button } from "../../../../uiCompoents/ui/button";
import { Input } from "../../../../uiCompoents/ui/input";
import { Label } from"../../../../uiCompoents/ui/label";
import { TaskType } from "../types/index";
import { Calendar as CalendarIcon } from "lucide-react";
import  Calendar  from "../../../../uiCompoents/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../uiCompoents/ui/popover";
import { format } from "date-fns";

interface TaskFormProps {
  onSubmit: (task: Omit<TaskType, "id">) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(Date.now() + 86400000) // tomorrow
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    onSubmit({
      title: title.trim(),
      completed: false,
      dueDate: date.toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task-title">Task Title</Label>
        <Input
          id="task-title"
          className="bg-gray-700 border-gray-600 text-gray-100"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="due-date">Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-gray-700 border-gray-600 text-gray-300 justify-start"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
            <Calendar
              setDate={setDate}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-600 text-gray-300 hover:text-gray-100 hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={!title.trim() || !date}
        >
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
