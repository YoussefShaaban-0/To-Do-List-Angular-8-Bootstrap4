import { Injectable } from '@angular/core';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [];
  nextId: number = 0;
  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }

  
  addTask(task: Task): void {
    task.id = this.nextId++;
    this.tasks.push(task);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  markAsCompleted(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = 'completed';
      this.updateTask(task);
    }
  }

}
