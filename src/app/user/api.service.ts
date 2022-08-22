import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // SERVER_URI="http://audit-portal-lb-926233193.us-west-2.elb.amazonaws.com/audit-portal"
  SERVER_URI="http://localhost:8500/audit-portal"
  constructor(private hc:HttpClient) { }

  authenticateUser(userLoginObj):Observable<any>{
    return this.hc.post(this.SERVER_URI+"/login",userLoginObj)
  }
   
  getAuditQuestions():Observable<any>{
    return this.hc.get(this.SERVER_URI+"/AuditCheckListQuestions/Internal")
  }

  submitAuditRequest(auditRequest):Observable<any>{
    return this.hc.post(this.SERVER_URI+"/ProjectExcecutionStatus",auditRequest)
  }

  getPastAuditRequests():Observable<any>{
    return this.hc.get(this.SERVER_URI+"/PastAuditRequests")
  } 
}
