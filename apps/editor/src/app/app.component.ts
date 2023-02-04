import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const INSTA_URL = 'https://instagram.com/moanees12?igshid=ZDdkNTZiNTM=';
@Component({
  selector: 'editor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly iconRegistry: MatIconRegistry,
    ) {
      iconRegistry.addSvgIcon('instagram',  this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/instagram.svg"));
    }
  title = 'editor';

  openInsta(): void {
    window.open(INSTA_URL, '_blank');
  }
}
