import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var cv: any;

@Component({
  selector: 'app-webcam',
  standalone: true,  // Make it standalone
  imports: [CommonModule],  // Import any Angular modules if needed
  templateUrl: './webcam.component.html',
  styleUrl: './webcam.component.css'
})
export class WebcamComponent implements OnInit, AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('faceCanvas') faceCanvas!: ElementRef<HTMLCanvasElement>;
  public stream: MediaStream | undefined = undefined;
  public imageCaptured = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.loadOpenCV();
  }

  // async loadOpenCV(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     cv.onRuntimeInitialized = () => {
  //       fetch('https://docs.opencv.org/4.x/haarcascade_frontalface_default.xml')
  //         .then(response => response.arrayBuffer())
  //         .then(data => {
  //           cv.FS_createDataFile('/', 'haarcascade_frontalface_default.xml', new Uint8Array(data), true, false);
  //           resolve();
  //         })
  //         .catch(err => {
  //           console.error('Failed to load Haar Cascade file:', err);
  //           reject(err);
  //         });
  //     };
  //   });
  // }

  startWebcam(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.stream = stream;
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch(error => console.log('Something went wrong!', error));
  }

  stopWebcam(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.videoElement.nativeElement.srcObject = null;
    }
  }

  captureImage(): void {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {  // Check if context is not null
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      // this.detectFaces();
    } else {
      console.error('Failed to get 2D context');
    }
  }

  // detectFaces(): void {
  //   if (this.imageCaptured) {
  //     const canvas = this.canvas.nativeElement;
  //     const faceCanvas = this.faceCanvas.nativeElement;
  //     let src = cv.imread(canvas);
  //     let gray = new cv.Mat();
  //     let faces = new cv.RectVector();
  //     cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  //     let faceCascade = new cv.CascadeClassifier();
  //     faceCascade.load('haarcascade_frontalface_default.xml');
  //     faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0);

  //     for (let i = 0; i < faces.size(); i++) {
  //       let face = faces.get(i);
  //       let point1 = new cv.Point(face.x, face.y);
  //       let point2 = new cv.Point(face.x + face.width, face.y + face.height);
  //       cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
  //     }

  //     faceCanvas.width = src.cols;
  //     faceCanvas.height = src.rows;
  //     cv.imshow(faceCanvas, src);

  //     src.delete();
  //     gray.delete();
  //     faces.delete();
  //     faceCascade.delete();
  //   }
  // }
}


