import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: object = {}

  constructor(
    private service: ChatService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.login = {username: "", password: "" }
  }

  loginCheck() {
    this.service.login(this.login['username'], this.login['password']).subscribe(info => {
      console.log(info)
      console.log(info['User'])
      if(info['User']){
        if(info['User'][0]["password"]==this.login['password']){
          console.log(info["User"][0]["_id"])
          sessionStorage.setItem("userID", info["User"][0]["_id"])
          let userID = sessionStorage.getItem("userID")
          console.log("userID:", userID)
          this._router.navigate(["dashboard"])
        }
      }
    })
  }
}
