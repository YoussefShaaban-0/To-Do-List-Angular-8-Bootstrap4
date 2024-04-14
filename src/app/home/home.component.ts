import { Component } from '@angular/core';
import { Task } from '../interfaces/Task';
import { TasksService } from '../Service/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  newTask: Task = {
    id: 0,
    name: '',
    description: '',
    dueDate: '',
    status: 'pending',
  };
  editingTask: Task | null = null;

  constructor(public tasksService: TasksService) {}

  ngOnInit(): void {}

  addTask(): void {
    if (!this.newTask.name) return;
    this.tasksService.addTask({ ...this.newTask });
    this.newTask = { id: 0, name: '', description: '', dueDate: '', status: 'pending' };
  }

  startEdit(task: Task): void {
    this.editingTask = { ...task };
  }

  saveEdit(): void {
    if (this.editingTask) {
      this.tasksService.updateTask(this.editingTask);
      this.editingTask = null;
    }
  }

  cancelEdit(): void {
    this.editingTask = null;
  }

  deleteTask(id: number): void {
    this.tasksService.deleteTask(id);
  }

  toggleStatus(task: Task): void {
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    this.tasksService.updateTask(task);
  }}

