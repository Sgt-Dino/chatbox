import { Component } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainchat: Observable<any[]>;
  item: AngularFireList<any>;
  user = 'Anonymous';
  // mainchat: any[];
  // subscription: Subscription;

  constructor(db: AngularFireDatabase) {
        this.mainchat = db.list('/mainchat').valueChanges();
        this.item = db.list('mainchat');
    // this.subscription = db.list('mainchat').valueChanges().subscribe(mainchat => {
    //       this.mainchat = mainchat;
    //       console.log(this.mainchat);
    //   });
  }
  title = 'chatbox';

  add(chat: HTMLInputElement) {
    this.item.push({
      message: chat,
      user: this.user
    });
    chat.textContent = '';
  }

  changeUser(user){
    if (user === '') {
      user = 'Anonymous';
    }
    this.user = user;
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
}
