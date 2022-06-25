import {Component, OnInit} from '@angular/core';
import {Task} from '../../Task';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];


  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(task: Task) {
    this.taskService.delete(task).subscribe(() => this.removeTaskFromMemoryAfterDelete(task));
  }

  removeTaskFromMemoryAfterDelete(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id)
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.create(task).subscribe(() => this.tasks = [...this.tasks, task]);
  }
}
