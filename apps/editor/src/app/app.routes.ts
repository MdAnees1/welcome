import { Route } from '@angular/router';
import { EditorComponent } from './editor/editor.component';

export const appRoutes: Route[] = [
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'editor'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'editor'
  }
];
