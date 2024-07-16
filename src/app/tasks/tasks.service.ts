import { Injectable, inject, signal } from '@angular/core';
import { type TaskStatus, type Task } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  public allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('ADDED TASK WITH TITLE ' + taskData.title);
  }

  updateTaskStatus(taksId: string, status: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) => (task.id === taksId ? { ...task, status } : task))
    );
    this.loggingService.log('CHANGE TASK STATUS TO ' + status);
  }
}
