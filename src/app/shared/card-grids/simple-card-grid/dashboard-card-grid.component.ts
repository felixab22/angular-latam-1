import {Component, Input, OnInit} from '@angular/core';
import {DashboardGridCardItem} from "../../../models/ui/gridcard";

@Component({
  selector: 'app-dashboard-card-grid',
  templateUrl: './dashboard-card-grid.component.html',
  styleUrls: ['./dashboard-card-grid.component.css']
})
export class DashboardCardGridComponent implements OnInit {

  @Input() columns!: number;
  @Input() gridCardItems!: DashboardGridCardItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
