import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebcamComponent } from './webcam/webcam.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WebcamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webcam-facial-recognition';
}
