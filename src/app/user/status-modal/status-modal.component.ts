import { Component, Input, OnInit } from '@angular/core';
import { AuditResponse } from 'types/Response';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit {

  @Input() response:AuditResponse;

  constructor() { }

  ngOnInit(): void {

  }

}
