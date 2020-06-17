import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/groups/shared/services/groups.service';

@Component({
  selector: 'app-about-group',
  templateUrl: './about-group.component.html',
  styleUrls: ['./about-group.component.scss']
})
export class AboutGroupComponent implements OnInit {

  constructor(
     private activatedRoute: ActivatedRoute,
     private groupService:   GroupsService
  ) { }

  ngOnInit() {
    
  }
}
