import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from "../user"
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userID = sessionStorage.getItem("userID")
  user = new User;
  Pokemon: object = { index: 0 }

  message: string;
  messages: Array<string> = []
  
  constructor(
    private service: ChatService,
    private _router: Router
    ) { }

  ngOnInit() {
    console.log("userID from session",this.userID)
    this.service.getUser(this.userID).subscribe(data => {
      this.user= data["User"]
      console.log(this.user)
    })

    this.service.retrieve().subscribe(info => {
      if(info['message']){
        this.messages.push(info['message'])
        console.log(info['message'])
      }
    });
  }

  sendMessage() {
    this.message=this.user[0]['username']+": "+this.message;
    this.service.sendMessage(this.message);
    this.message = ''
  }

  Battle() {
    console.log(this.Pokemon['id'])
    sessionStorage.setItem("pokemonIndex", this.Pokemon['index'])
    this._router.navigate(['/battle'])
  }

}
