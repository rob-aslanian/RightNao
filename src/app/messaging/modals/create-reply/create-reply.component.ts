import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CONSTANTS } from 'src/app/messaging/shared/constants';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service';
import { FilepathPipe } from 'src/app/messaging/shared/pipes/filepath.pipe';

@Component({
  selector: 'app-create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateReplyComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() selectedReply: any
  @Input() conversationName;

  title: string;
  text: string;
  formData: FormData;
  selectedFilename = ''
  selectedFiles = []; // This should be used when I implement multiple file uploads.

  constructor(
    private apollo: Apollo,
    private cookieService: CookieService,
    private http: HttpClient,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {
    this.title = this.selectedReply ? this.selectedReply.title : '';
    this.text = this.selectedReply ? this.selectedReply.text : '';
    this.selectedFiles = this.selectedReply ? this.selectedReply.files : [];

    if (this.selectedFiles.length !== 0) {
      let filePathPipe = new FilepathPipe();
      this.selectedFiles = this.selectedReply.files;
      this.selectedFilename = this.selectedFiles[0].name;
      setTimeout(() => {
        document.getElementById('imagePlaceholder')['src'] = filePathPipe.transform(this.selectedFiles[0].id)
      }, 1000)

    } else {
      this.selectedFiles = [];
      this.formData = null;
      this.selectedFilename = ''
    }

    let tagsOccurance = (this.text.match(/___/g) || []).length;
    let html = this.text;
    
    if (tagsOccurance !== 0) {
      let tagsIds = [];
      for (let i = 0; i < tagsOccurance; i++) {
        let id = new Date().getTime().toString() + i;
        html = html.replace('___', `<span id="tag-${id}" contenteditable="false" class="personalize-tag">Full name<span id="remove-btn-${id}" aria-hidden="true" class="tag-close-btn">&times;</span></span>`)
        document.getElementById('inputBox').innerHTML = html;
        tagsIds.push(id)
      }
      
      setTimeout(()=>{
        tagsIds.forEach((tagId)=>{
          let btn = document.getElementById(`remove-btn-${tagId}`);

          btn.addEventListener('click', (e: Event) => this.removeTag(tagId))
        })
      },2000)
      

      document.getElementById('inputBox').innerHTML = html;
    }else {
      document.getElementById('inputBox').innerHTML = this.text;
    }
  }

  close() {
    this.closeModal.emit();
  }

  // Select file and show inside the img tag
  fileChange(event) {
    this.formData = new FormData();
    let file = event.target.files[0];
    this.formData.append('file', file, file.name);
    this.selectedFilename = file.name;

    if (this.getFileExt(this.selectedFilename) == '.jpg' || this.getFileExt(this.selectedFilename) == '.png') {
      let tgt = event.target || window.event.srcElement,
        files = tgt.files

      if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
          document.getElementById('imagePlaceholder')['src'] = fr.result;
        }
        fr.readAsDataURL(files[0]);
      }
    }
  }

  removeSelectedFile() {
    this.selectedFilename = '';
    this.formData = null;
    this.selectedFiles = [];
  }

  // get the type of the file based on extension.
  getFileExt(file_name) {
    let dotIndex = file_name.lastIndexOf('.')
    let fileExt: string = file_name.substring(dotIndex);
    return fileExt.toLowerCase()
  }

  // Upload file if any. Give details of uploaded file in callback
  checkAndUploadFile(callback) {
    if (this.formData) {
      let token = this.cookieService.get('token_user');
      this.http.post(CONSTANTS.FILEPATH + '?token=' + token, this.formData)
        .subscribe(
          (res: any) => {

            // let filepath = CONSTANTS.FILEPATH + '/' + res.files[0]['id'];
            callback(res.files[0]);
          },
          err => {
            alert('Oops! Failed to upload the file. Press CTRL+SHIFT+I to see the error in console.')
            callback('');
          }
        );
      //upload file and then callback with acual uploaded file path

    } else {
      callback('');
    }
  }

  onSave() {
    let reply = this.depersonalize();
    if (reply == '' || this.title == '') {
      alert("Error-101 Please provide both Title and Text of the reply.")
    } else {

    

      this.checkAndUploadFile((fileData) => {
        fileData.length !== 0 && this.selectedFiles.push(fileData);
        let isUpdate = this.selectedReply ? true : false;
        let variables = {
          title: this.title,
          text: this.depersonalize(),
          files: this.selectedFiles
        }

        this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)
        isUpdate && (variables['id'] = this.selectedReply.id)

        this.apollo.mutate({
          mutation: isUpdate ? this.graphQLMappingService.UpdateReply : this.graphQLMappingService.CreateReply,
          variables: variables
        }).subscribe(({ data }) => {
          let msg = this.selectedReply ? 'updated' : 'created'
          // alert('Reply ' + msg + ' successfully!')
          this.close();
        }, (error) => {
          alert('Error 101 - ' + error);
        });
      })
    }
  }


  depersonalize() {
    let inputText = document.getElementById('inputBox').innerText;
    // let tags: any = document.getElementsByClassName('personalize-tag');

    // for (let tag of tags) {
    //   inputText = inputText.replace(tag.outerHTML, '___');
    // }

    inputText = inputText.replace(/Full name×/g, '___')
    return inputText;
  }

  placeTag(html) {
    var sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

        var el = document.createElement('div');
        el.innerHTML = html;
        var frag = document.createDocumentFragment(), node, lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);

        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    } else if (document['selection'] && document['selection'].type != "Control") {
      document['selection'].createRange().pasteHTML(html)
    }
  }

  removeTag(id) {
    document.getElementById(`tag-${id}`).remove();
  }

  addTag() {
    document.getElementById('inputBox').focus();
    let id = new Date().getTime().toString();
    // this.placeTag(`<span id="tag-${id}" contenteditable="false" class="fullname-tag">Fullname<button id="remove-btn-${id}" class=""`)

    this.placeTag(`<span id="tag-${id}" contenteditable="false" class="personalize-tag">Full name<span id="remove-btn-${id}" class="tag-close-btn"  aria-hidden="true">&times;</span></span>`)

    // this.placeTag(`<span id="tag-${id}"  contenteditable="false" >`)

    let btn = document.getElementById(`remove-btn-${id}`);
    btn.addEventListener('click', (e: Event) => this.removeTag(id))
  }
}
