import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rank-box',
   template: `
      <span class="rank-box d-inline-block">{{ name }} 
        <ng-container *ngIf="rank">
          - {{ rank | rank }}
        </ng-container>
      </span>
   `,
  styles: [`
      .rank-box {
          background: #DCE1E6;
          padding-left: 10px;
          padding-right: 10px;
          padding-bottom: 6px;
          border-radius: 5px;
          margin-right: 10px;
          margin-bottom: 10px;  
          height: 32px;
          padding-top: 2px;
    }
  `]
}) 
export class RankBoxComponent  {
    @Input() name: string;
    @Input() rank?: string;
};
