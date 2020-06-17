import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileIcon'
})
export class FileIconPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let ext = value.toLowerCase();
    if (ext == '.docx' || ext == '.doc' || ext == '.txt' || ext == '.text') {
      return 'assets/img/144.svg';
    }
    else if (ext == '.xlsx') {
      return 'assets/img/143.svg';
    }
    else if (ext == '.zip') {
      return 'assets/img/140.svg';
    }
    else if (ext == '.mp3') {
      return 'assets/img/141.svg';
    }
    else if (ext == '.pptx') {
      return 'assets/img/142.svg';
    }
    else if (ext == '.pdf') {
      return 'assets/img/145.svg';
    }
    else {
      return 'assets/img/268.svg';
    }
  }

}
