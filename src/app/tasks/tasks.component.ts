import {Component, computed, DestroyRef, inject, input, OnInit, signal} from '@angular/core';

import { TaskComponent } from './task/task.component';
import {TasksService} from './tasks.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>();
  orderObservable = signal<'asc' | 'desc' | undefined>(undefined);

  private activatedRoute = inject(ActivatedRoute);
  private taskService = inject(TasksService);
  private destroyRef = inject(DestroyRef);

  userTasks = computed(() => this.taskService
    .allTasks()
    .filter((task) => task.userId === this.userId())
    .sort((a, b) => {
      if (this.order() === 'desc') {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    })
  );

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.orderObservable.set(params['order']);
      })
  }
}
