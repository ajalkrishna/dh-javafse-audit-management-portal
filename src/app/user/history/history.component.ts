import { Component, OnInit } from '@angular/core';
import { PastRequest } from 'types/past-request';
import { AuditRequest } from 'types/Request';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  pastRequests:PastRequest[]=[];
  stopLoading:boolean=true;
  emptyMessage:string

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getPastAuditRequests().subscribe(res => {
      this.pastRequests = res;
      if(res.length==0){
        this.emptyMessage="No past requests found!!"
        console.log(this.emptyMessage);
        console.log(res)
      }
    })
    setTimeout(() => {
      this.stopLoading=false
    }, 3000);
    
  }

}
