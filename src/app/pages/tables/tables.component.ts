import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  loggedInUser: any = {};
  AllExpenses: any = [];
  AllMyExpenses: any = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedInUser = this.authService.currentUser();    

    this.authService.getAllExpenses().pipe(first()).subscribe(
      (data) => {
        if(data.status == 'OK') {
          this.AllExpenses = data.expenses_list;
          console.log(this.AllExpenses);
        }
      },
      (error) => {
        console.log(error);
      });

    this.authService.getAllMyExpenses().pipe(first()).subscribe(
      (data) => {
        if(data.status == 'OK') {
          this.AllMyExpenses = data.expenses_list;
          console.log(this.AllExpenses);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
