import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent {
  name = 'Rochelle Nero';
  emailAddress = 'rochellej827@gmail.com';
}


