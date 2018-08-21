import { Component } from '@angular/core';

@Component({
  selector: 'basic-auto-demo',
  template: `
    <div>
      <h3>
        Fluid Row Heights 
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/basic-auto.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [dragulaName]="'newBag'" 
        (onRowDrop)="onDropEvent($event)"
        [rows]="rows"
        [loadingIndicator]="loadingIndicator"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [reorderable]="reorderable">
        <ngx-datatable-column name="Name">
          <ng-template let-value="value" ngx-datatable-cell-template>
            <span class="handle">====</span>
            <strong>{{value}}</strong>
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class BasicAutoComponent {

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company', sortable: false }
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  onDropEvent(event) {
    console.log('dropped', event);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
