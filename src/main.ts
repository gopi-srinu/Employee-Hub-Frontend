import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import Aos from 'aos';

bootstrapApplication(AppComponent, appConfig).then(() => Aos.init())
  .catch((err) => console.error(err));
