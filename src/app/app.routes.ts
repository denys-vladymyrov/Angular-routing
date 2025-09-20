import {CanMatchFn, RedirectCommand, Router, Routes} from '@angular/router';
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import {resolveTitle, resolveUserName, UserTasksComponent} from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from './not-found/not-found.component';
import {inject} from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 1) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No task selected'
  },
  {
    path: 'users/:userId',      // <your-domain>/users/<uid>
    component: UserTasksComponent,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello World!'   // create 'message' input in the component
    },
    resolve: {
      userName: resolveUserName //
    },
    title: resolveTitle,
    loadChildren: () => import('./users/users.routes').then(m => m.routes)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
