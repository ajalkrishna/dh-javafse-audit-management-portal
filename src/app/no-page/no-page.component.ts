import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styleUrls: ['./no-page.component.scss']
})
export class NoPageComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.route.navigateByUrl("login");
    },2000)
  }

}
