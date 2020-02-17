import { Component, IterableDiffers } from '@angular/core';
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
  startDate = new Date('2099-02-20T12:01:04.753Z');
  // mainchat: any[];
  // subscription: Subscription;

  constructor(db: AngularFireDatabase) {

        this.mainchat = db.list('/mainchat', ref => {
          let q = ref.orderByChild('time');
          return q;
        }
        ).valueChanges();
        this.item = db.list('mainchat');
    // this.subscription = db.list('mainchat').valueChanges().subscribe(mainchat => {
    //       this.mainchat = mainchat;
    //       console.log(this.mainchat);
    //   });
  }

  title = 'chatbox';

  add(chat: HTMLInputElement) {
    let endDate = Date.now();
    let dif = 2000000000000 - endDate;
    this.item.push({
      message: chat.value,
      user: this.user,
      time: dif
    });
    chat.value = '';
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
