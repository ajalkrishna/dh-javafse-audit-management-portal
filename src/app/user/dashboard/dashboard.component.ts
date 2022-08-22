import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'types/question';
import { AuditRequest } from 'types/Request';
import { AuditResponse } from 'types/Response';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  auditQuestions:Question[]=[];
  auditType: string;
  auditRequest: FormGroup;
  isAuditTypeChosen:Boolean=true;
  responseCount:number;
  validOption:boolean=true
  auditResponse:AuditResponse;

  constructor(private api: ApiService, private fb: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.auditRequest = this.fb.group({
      projectName: ['',Validators.required],
      projectManagerName: ['',Validators.required],
      projectOwnerName: ['',Validators.required],
      applicationOwnerName: ['',Validators.required]
    })
  }
  get projectName() { return this.auditRequest.get('projectName'); }
  get projectManagerName() { return this.auditRequest.get('projectManagerName'); }
  get projectOwnerName() { return this.auditRequest.get('projectOwnerName'); }
  get applicationOwnerName() { return this.auditRequest.get('applicationOwnerName'); }

  chooseAudit(event) {
    this.auditType = event.target.value
    this.confirmAudit()
    this.isAuditTypeChosen=false;
  }
  confirmAudit() {
    this.api.getAuditQuestions().subscribe({
      next: (res) => {
        if (res.payload == null) {
          alert("res.message")
        }
        else {
          this.auditQuestions = res.payload;
        }
      },
      error: () => {
        alert("something went wrong")
      }
    })
  }
  chooseOption(event, index) {
    this.auditQuestions[index].status = event.target.value
    let responseCount = this.auditQuestions.filter((obj) => obj.status == 'NO' || obj.status == 'YES').length
    if(responseCount==this.auditQuestions.length){
      this.validOption=false;
    }
  }

  submitAuditRequest() {
      let finalAuditRequest:AuditRequest = this.createAuditRequest(); 
      this.api.submitAuditRequest(finalAuditRequest).subscribe({
        next: (res) => {
          if(res==null){
            return alert("something went wrong");
          }
          this.auditResponse=res;
        },
        error: () => {
          alert("something went wrong")
        }
      })    
  }
  createAuditRequest() {
    let filteredData = this.auditQuestions.filter((obj) => obj.status == 'NO')
    let noCount = filteredData.length
    let yesCount = this.auditQuestions.length - noCount
    let auditRequest = this.createAuditRequestObj(yesCount, noCount);
    return auditRequest;
  }

  createAuditRequestObj(yesCount: number, noCount: number) {
    let auditRequest = this.auditRequest.value;
    auditRequest.auditType = this.auditType,
    auditRequest.auditDate = this.getDate(),
    auditRequest.yesCount = yesCount,
    auditRequest.noCount = noCount
    return auditRequest;
  }

  getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let auditDate = dd + '/' + mm + '/' + yyyy;
    return auditDate;
  }

  goToHistory(){
    this.route.navigateByUrl('user/history')
    this.auditRequest.reset();
  }
}
