import { Route } from '@angular/router';
import { EditorComponent } from './editor/editor.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: EditorComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'editor'
  }
];
