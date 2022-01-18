export interface GridCardItem{
  id: string;
  title: string;
  content: string;
  buttonText: string;
  cols: number;
  rows: number;
}

export interface DashboardGridCardItem extends GridCardItem{
  color?: string;
}
