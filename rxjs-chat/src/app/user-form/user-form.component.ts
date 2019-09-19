import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  newUser: object = {}
  submitted = false;

  constructor(
    private service: ChatService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.newUser = {
      username: "",
      email: "",
      password: ""
    }
  }

  onSubmit() {
    console.log("NewUser:",this.newUser['User'])
    this.service.PostUser(this.newUser).subscribe(info => {
      console.log("response:",info)
      sessionStorage.setItem("userID", info["_id"])
      var id = sessionStorage.getItem("userID")
      this._router.navigate(['/dashboard'])
    })

  }

}
