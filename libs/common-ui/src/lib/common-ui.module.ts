import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorService } from './monaco-editor.service';

@NgModule({
  imports: [CommonModule],
  providers: [ MonacoEditorService ]
})
export class CommonUiModule {}
