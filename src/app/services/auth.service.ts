import { inject, Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject (Router);
  userData: any = null;
  $isLoggedIn = signal(false);

  constructor(private auth: AngularFireAuth) {
    //Comprobar si el usuario esta logueado automaticamente
    this.auth.authState.subscribe(data=>{
      if(data){
        //Estoy logueado
        this.userData = data;
        this.$isLoggedIn.set(true);
      }else{
        //No estoy logueado
        this.userData = null;
        this.$isLoggedIn.set(false);
        this.router.navigate(['login']);
      }
    })

   }

  async login(){
    try{
      let user = await this.auth.signInWithPopup(new GoogleAuthProvider())
      console.log(user);
      return user;
    }catch(err){
      console.error(err);
      return err;
    }
  }
  logout(){
    this.auth.signOut();
  }
}