import { Component, ViewChild } from '@angular/core';
import { NgxCroppieComponent } from 'ngx-croppie';
import { CroppieOptions } from 'croppie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zoom And Switch Pictures';
  @ViewChild('ngxCroppie') ngxCroppie: NgxCroppieComponent;

  widthPx = '600';
  heightPx = '600';
  imageUrl = '';
  currentImage: string;
  croppieImage: string;
  files: any;
  file:any;
  cache:any[] = [];
  memorystack:any[] = [];
  point = 0;

  public get imageToDisplay() {
    if (this.currentImage) { return this.currentImage; }
    if (this.imageUrl) { return this.imageUrl; }
    return `http://placehold.it/${this.widthPx}x${this.heightPx}`;
  }

  public get croppieOptions(): CroppieOptions {
    const opts: CroppieOptions = {};
    opts.viewport = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.boundary = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.enforceBoundary = true;
    return opts;
  }

  ngOnInit() {
    this.currentImage = this.imageUrl;
    this.croppieImage = this.imageUrl;
  }

  ngOnChanges(changes: any) {
    if (this.croppieImage) { return; }
    if (!changes.imageUrl) { return; }
    if (!changes.imageUrl.previousValue && changes.imageUrl.currentValue) {
      this.croppieImage = changes.imageUrl.currentValue;
    }
  }


  // modalOpened() {
  //   if (this.croppieImage) {
  //     console.log('binding image to croppie');
  //     this.ngxCroppie.bind();
  //   }
  // }

  newImageResultFromCroppie(img: string) {
    this.croppieImage = img;
  }

  saveImageFromCroppie() {
    this.currentImage = this.croppieImage;
  }

  cancelCroppieEdit() {
    this.croppieImage = this.currentImage;
  }

  prev(){
    this.croppieImage="";
    console.log(this.point);
    console.log(this.files[this.point]);
    this.file = this.files[this.point];
    if (this.file.type !== 'image/jpeg' && this.file.type !== 'image/png' && this.file.type !== 'image/gif' && this.file.type !== 'image/jpg') { return; }
      let fr2 = new FileReader();
      fr2.onloadend = (loadEvent) => {
        this.cache = fr2.result;
        this.croppieImage = fr2.result;
      };
      fr2.readAsDataURL(this.file);

      if(this.point<this.files.length&&this.point>0){
        this.point-=1;
      }
  }

  next(){
    this.croppieImage="";
    console.log(this.point);
    console.log(this.files[this.point]);
    this.file = this.files[this.point];
    if (this.file.type !== 'image/jpeg' && this.file.type !== 'image/png' && this.file.type !== 'image/gif' && this.file.type !== 'image/jpg') { return; }
      let fr1 = new FileReader();
      fr1.onloadend = (loadEvent) => {
        this.cache = fr1.result;
        this.croppieImage = fr1.result;
      };
      fr1.readAsDataURL(this.file);
      if(this.point<this.files.length-1&&this.point>=0){
        this.point+=1;
      }
  }

  showfile(file){
    console.log(file.name);
    this.croppieImage="";
    let fr1 = new FileReader();
      fr1.onloadend = (loadEvent) => {
        this.croppieImage = fr1.result;
      };
      fr1.readAsDataURL(file);
  }


  imageUploadEvent(evt: any) {
    if (!evt.target) { return; }
    if (!evt.target.files) { return; }
    if (evt.target.files.length !== 3) { return; }//在这里定义需要显示的图片的数量
    this.files = evt.target.files;//上传的所有文件，以数组的形式保存，可以在方法外部被读取
    this.file = this.files[this.point];
    if (this.file.type !== 'image/jpeg' && this.file.type !== 'image/png' && this.file.type !== 'image/gif' && this.file.type !== 'image/jpg') { return; }
      let fr1 = new FileReader();
      fr1.onloadend = (loadEvent) => {
        this.cache = fr1.result;
        this.croppieImage = fr1.result;
      };
      fr1.readAsDataURL(this.file);
  }
}
