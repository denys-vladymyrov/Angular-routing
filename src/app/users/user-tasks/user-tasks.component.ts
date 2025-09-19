import {Component, computed, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {UsersService} from "../users.service";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  userNameObservable = signal('');
  private destroyRef = inject(DestroyRef);

  userName = computed(() => this.usersService.users.find((user) => user.id === this.userId())?.name);

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(paramMap => {
        this.userNameObservable.set(this.usersService.users.find((user) => user.id === paramMap.get('userId'))?.name || '')
    })
  }
}
