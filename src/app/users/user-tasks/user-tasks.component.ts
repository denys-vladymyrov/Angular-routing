import {Component, computed, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {UsersService} from "../users.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot
} from "@angular/router";
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
export class UserTasksComponent {
  userId = input.required<string>();
  message = input.required<string>();
  userName = input.required<string>();

  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  userNameObservable = signal('');
  private destroyRef = inject(DestroyRef);

  // userName = computed(() => this.usersService.users.find((user) => user.id === this.userId())?.name);

  // ngOnInit() {
  //   console.log(this.message());
  //
  //   this.activatedRoute.paramMap
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(paramMap => {
  //       this.userNameObservable.set(this.usersService.users.find((user) => user.id === paramMap.get('userId'))?.name || '')
  //   })
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  return usersService.users.find((user) => user.id === activatedRoute.paramMap.get('userId'))?.name || '';
}
