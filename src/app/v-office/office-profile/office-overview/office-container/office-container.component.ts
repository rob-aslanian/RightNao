import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  IQualification,
  IServices
} from "src/app/_shared/models/service/v-office/v-office-model";
import { OfficeService } from "src/app/_shared/services/v-office/office.service";
import { Observable } from "apollo-link";
import { Subject } from "rxjs";

@Component({
  selector: "app-office-container",
  templateUrl: "./office-container.component.html",
  styleUrls: ["./office-container.component.scss"]
})
export class OfficeContainerComponent implements OnInit {
  office: any = {};

  //Description
  description: { description: string; office_id: string, isMe: boolean } = {
    description: "",
    office_id: this.office.id,
    isMe: true
  };

  //Qualification
  qualifications: IQualification = {
    qualifications: {},
    office_id: "",
    isMe: true
  };

  //Services
  services: IServices = {
    office_id: "",
    isMe: true,
    services: []
  };
  // Set keys for isViewMode
 

  constructor(
    private router: ActivatedRoute,
    private officeService: OfficeService
    ) {}

  ngOnInit() {
   

  }
}
