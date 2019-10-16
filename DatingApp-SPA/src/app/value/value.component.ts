import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any; // Just any javascript variable

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    // Deberia tiparse siempre que se pueda ----> get<string[]>('http://localhost:5000/api/values')
    this.http
      .get('http://localhost:5000/api/values')
      .subscribe(response => {
        this.values = response;
      }, error => {
        console.log(error);
      });
  }

  // handleResponse = (response: string[]) => {
  //   this.values = response;
  // }

  // handleError = (error: HttpErrorResponse) => {
  //   console.log(error);
  // }

  testIIFE = () => {
    (() => {
      const kiwi = 0;
      console.log(kiwi);
    })();
    (() => {
      const kiwi = 9;
      console.log(kiwi);
    })();
  }
}
