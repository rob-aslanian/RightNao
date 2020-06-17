import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service';
import { FilepathPipe } from 'src/app/messaging/shared/pipes/filepath.pipe';
import { MessageDatePipe } from 'src/app/messaging/shared/pipes/message-date.pipe';
import { DateFormatPipe } from 'src/app/messaging/shared/pipes/date-format.pipe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shared-photos',
  templateUrl: './shared-photos.component.html',
  styleUrls: ['./shared-photos.component.scss']
})
export class SharedPhotosComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() photos: any[];
  @Input() conversation;
  @Input() selectedPhotoIndex;

  selectedPhoto: any = {}
  viewType: string;
  isSlideView = true;
  selectedItems = [];
  downloadSelections = [];

  filePathPipe = new FilepathPipe();
  messageDatePipe = new MessageDatePipe();
  dateFormatPipe = new DateFormatPipe();

  constructor(
    private apollo: Apollo,
    private listenersService: ListenersService,
    private graphQLMappingService: MappingService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.viewType = 'SLIDER'
    this.photos.length !== 0 && (this.selectedPhoto = this.photos[this.selectedPhotoIndex])
  }

  onDownloadClick() {
    if (this.isSlideView) {
      this.downloadPhoto(this.selectedPhoto.fileUrl);
    } else {
      if (this.downloadSelections.length == 0) {
        alert('Please select an image to download')
      } else {
        this.downloadSelections.forEach((photo) => {
          this.downloadPhoto(photo.fileUrl);
        })
      }
    }
  }

  async downloadPhoto(photoId) {
    let filepath = this.filePathPipe.transform(photoId)
    let a = document.createElement('a');
    try {
      a.href = await this.toDataURL(filepath)
      a.download = new Date().getTime() + '.png';
      a.target = '_blank'
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { document.body.removeChild(a) }, 500)
    }
    catch (err) {
      alert(err)
    }
  }

  toDataURL(url) {
    return fetch(url,
      {
        credentials: 'include',
        // mode: 'no-cors'      
      }).then((response) => {
        return response.blob();
      }).then(blob => {
        return URL.createObjectURL(blob)
      })
  }

  close() {
    this.closeModal.emit();
  }

  // Navigation for next and previous image button clicks
  nav(type) {
    let currentIndex = this.photos.findIndex(x => x.file == this.selectedPhoto.file)

    if (type == 'NEXT') {
      let i = (currentIndex == this.photos.length - 1) ? 0 : (currentIndex + 1);
      this.selectedPhoto = this.photos[i]
    } else {
      let i = (currentIndex == 0) ? (this.photos.length - 1) : (currentIndex - 1)
      this.selectedPhoto = this.photos[i]
    }
  }

  getParticipant(id) {
    console.log(id);
    
    let participant = this.conversation.participants.filter((item) => item.id == id)[0];
    console.log( this.conversation );
    
    return participant
  }

  getPhotoDateTime(timestamp) {
    let photoDate = this.messageDatePipe.transform(timestamp);
    let photoTime = this.dateFormatPipe.transform(timestamp);
    return photoDate + ' ' + photoTime;
  }

  onGridPhotoClick(photo) {
    if (this.isPhotoSelectedForDownload(photo)) {
      this.downloadSelections = this.downloadSelections.filter((item) => item.file !== photo.file);
    } else {
      this.downloadSelections.push(photo)
    }
  }

  isPhotoSelectedForDownload(photo) {
    let isPresent = this.downloadSelections.find((item) => item.file == photo.file);
    return isPresent ? true : false;
  }
}
