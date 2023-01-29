import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonacoEditorService } from '@welcome/common-ui';
import { first } from 'rxjs';
declare const monaco: any;

@Component({
  selector: 'editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit, OnInit {
  public _editor: any;
  options: any = {
    language: 'json',
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: 'vs-dark',
  };
  // new FormControl(['ascending', Validators.required]);
  @ViewChild('editorContainer', { static: true }) _editorContainer!: ElementRef;
  sortForm: FormGroup;

  constructor(private readonly monacoEditorService: MonacoEditorService,
    private fb: FormBuilder) {
      this.sortForm = this.fb.group({
        sortType: ['ascending', Validators.required]
      })
    }

  ngOnInit(): void {
    this.monacoEditorService.load();
  }

  private initMonaco(): void {
    if (!this.monacoEditorService.loaded) {
      this.monacoEditorService.loadingFinished.pipe(first()).subscribe(() => {
        this.initMonaco();
      });
      return;
    }

    this._editor = monaco.editor.create(
      this._editorContainer.nativeElement,
      this.options
    );
  }

  ngAfterViewInit(): void {
    this.initMonaco();
  }

  sortJSON(): void {
    const JSON_VALUE = JSON.parse(this._editor.getValue());
    this._editor.setValue(JSON.stringify(this.sortJSONObj(JSON_VALUE), null, 2));
  }

  sortJSONObj(json: any): any {
    if (typeof json !== "object") return json;

    const sorted: any = Array.isArray(json) ? [] : {};
    Object.keys(json).sort(this.compareFn).forEach((key) => {
      sorted[key] = this.sortJSONObj(json[key]);
    });
    return sorted;
  }
  private compareFn = (a: string,b: string)=> {
    if(this.sortForm.get('sortType')?.value === 'descending') {
      return a > b ? -1: 1;
    }
    else {
      return a > b ? 1: -1;
    }
    }
}
