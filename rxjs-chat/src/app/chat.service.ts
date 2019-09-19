import { Injectable } from '@angular/core';
import * as io from "socket.io-client"
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url ="http://localhost:8000"
  private socket;

  constructor(private server: HttpClient) { 
    this.socket = io(this.url)
   }

   public sendMessage(message) {
     this.socket.emit('new-message', message)
   };

   MyPokemon(pokemon: object){
    this.socket.emit("my-pokemon", pokemon)
   }

   public startBattle(img) {
     this.socket.emit('start-battle', img)
   };

   public sendMove(move: object) {
     this.socket.emit('send-move', move)
   }

   public retrieve = () => {
     return Observable.create(observer => {
       this.socket.on('new-message', message => {
         console.log(message)
         observer.next({message: message});
       })
       this.socket.on('new-user', yay => {
         console.log(yay)
         observer.next({newuser: yay});
       })
       this.socket.on('foe-pokemon', pokemon => {
        console.log("newfoe in service")
        observer.next({newfoe: pokemon});
      })
      this.socket.on('foe-move', move => {
        console.log("enemy move in service")
        observer.next({movefoe: move});
      })
     })
   }
   public retrieveBattle = () => {
     return Observable.create(oberver => {
       this.socket.on("foeArrived", img => {

       })
     })
   }

   PostUser(user: object){
     console.log("PostUser Service",user)
     return this.server.post("/api/users", user)
   }
   getUser(userID: String){
     return this.server.get(`/api/users/${userID}`)
   }
   login(username: string, password: string){
     return this.server.get(`/api/users/${username}/${password}`)
   }
}
