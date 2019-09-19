import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service"

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  userID: string;
  pokemonIndex: number;
  myPokemon: object;
  user: object;

  foeRecieved = false;
  foePokemon: object = {};

  moves: object;
  choice: object = {}

  message: string;
  messages: Array<string> = []

  constructor(private chatService: ChatService) { }

  
  ngOnInit() {
    this.userID = sessionStorage.getItem("userID")
    let index = sessionStorage.getItem("pokemonIndex")
    this.pokemonIndex = parseInt(index, 10);
    this.chatService.getUser(this.userID).subscribe(info => {
      if(info['User']){
        this.user=info['User'][0]
        this.myPokemon=this.user["pokemon"][this.pokemonIndex]
        console.log("myPokemon:",this.myPokemon)
        this.chatService.MyPokemon({img: this.myPokemon['img'], health: this.myPokemon['health']});
      }
    })

    this.chatService.retrieve().subscribe(info => {
      if(info['message']){
        this.messages.push(info['message'])
        console.log(info['message'])
      }
      if(info['newfoe'] && this.foeRecieved == false){
        this.messages.push("An enemy has entered the arena!")
        console.log("newfoe battle component",info['newfoe'])
        this.foePokemon['img']=info["newfoe"]["img"]
        console.log("test")
        this.foePokemon['health']=info['newfoe']['health']
        console.log("foe Pokemon new:",this.foePokemon)
        this.chatService.MyPokemon({img: this.myPokemon['img'], health: this.myPokemon['health']});
        this.foeRecieved= true;
      }
      if(info['movefoe']){
        console.log(info['movefoe'])
        if(info['movefoe']['move']['damage']<0){
          this.myPokemon['health']=this.myPokemon['health']+info['movefoe']['move']['damage']
        }
        else if(this.foePokemon['health']<100){
          this.foePokemon['health']=this.foePokemon['health']+info['movefoe']['move']['damage']
        }
      }
    });
  }
  
  sendMessage() {
    this.message=this.user['username']+": "+this.message;
    this.chatService.sendMessage(this.message);
    this.message = ''
  }


  attack() {
    this.message=this.user['username']+": "+this.choice['move']['description'];
    this.chatService.sendMessage(this.message);
    this.message = ''
    this.chatService.sendMove(this.choice)
    if(this.choice['move']['damage']<0){
      this.foePokemon["health"]=this.foePokemon['health']+this.choice['move']['damage']
    }
    else if(this.myPokemon['health']<100){
      this.myPokemon['health']=this.myPokemon['health']+this.choice['move']['damage']
    }
  }

}
