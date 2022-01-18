import {Component, OnInit} from '@angular/core';
import {DashboardGridCardItem} from "../../../../models/ui/gridcard";
import {InicioConstants} from "../../constants";


@Component({
  selector: 'app-cards-section',
  templateUrl: './cards-section.component.html',
  styleUrls: ['./cards-section.component.css']
})
export class CardsSectionComponent implements OnInit {


  dashBoardGrids: DashboardGridCardItem[] = [
    {
      id: InicioConstants.NEGOS_CREADOS_ID,
      title: 'Negos Creados',
      content: '123', // Mock
      buttonText: 'Ver Detalle',
      cols: 1,
      rows: 1,
      color:'#99E1DE'
    },
    {
      id: InicioConstants.NEGOS_PENDIENTES_ID,
      title: 'Negos Pendientes',
      content: '82', // Mock
      buttonText: 'Ver Detalle',
      cols: 1,
      rows: 1,
      color:'#FFC700'
    },
    {
      id: InicioConstants.NEGOS_APROBADOS_ID,
      title: 'Negos Aprobados',
      content: '46', // Mock
      buttonText: 'Ver Detalle',
      cols: 1,
      rows: 1,
      color:'#00B5AD'
    },
    {
      id: InicioConstants.NEGOS_RECHAZADOS_ID,
      title: 'Negos Rechazados',
      content: '3', // Mock
      buttonText: 'Ver Detalle',
      cols: 1,
      rows: 1,
      color:'#B30F3B'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
