import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_SALES = gql`
  query {
    sales {
      id
      category
      brand
      amount
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  sales: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<any>({ query: GET_SALES })
      .valueChanges
      .subscribe(result => {
        this.sales = result.data.sales;
        console.log(this.sales);
      });
  }
}
