export class RespEstadosSolicitud 
    {
        page : number;
        limit : number;
        pages : number;		
        data: EstadosSolicitud[];
}
export class EstadosSolicitud {
    createdDate: string;
    updatedDate: string;
    requestNumber: number;
    applicantUser: string;
    applicantName: string;
    od: string;
    availableSeat: string;
    pnr: string;
    status: string;
    requestType: string;
  }
  export class EstadosResponse
  {
    id: string;
    label: string;
}
export class userResponse
{
    id: string;
    applicantUser: string;
    applicanFullName : string;
}