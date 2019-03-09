import { Component } from "@angular/core";


interface Company{
    name: string,
    code: string,
    price: number,
}

@Component({
    selector: "market-page",
    templateUrl: "market.html",
    styleUrls:["market.css"]
})
export class MarketComponent{

    companies : Company[];
    selectedCompany : Company;
   
    constructor() {
        this.companies = [ {
              name: "Google",
              code: "GOOG",
              price: 45
          },{
              name: "Microsoft",
              code: "MSFT",
              price: 23
          },{
              name : "Apple",
              code : "AAPL",
              price : 34
          },{
              name : "Marvell",
              code : "MRVL",
              price : 13
          },{
              name : "Cisco Systems",
              code : "CSCO",
              price : 65
          }, {
              name : "Intel",
              code : "INTC",
              price : 32
          }, {
              name : "Ebay Inc.",
              code : "EBAY",
              price : 14
          }, {
            name: "Google",
            code: "GOOG",
            price: 45
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name : "Apple",
            code : "AAPL",
            price : 34
        },{
            name : "Marvell",
            code : "MRVL",
            price : 13
        },{
            name : "Cisco Systems",
            code : "CSCO",
            price : 65
        }, {
            name : "Intel",
            code : "INTC",
            price : 32
        }, {
            name : "Ebay Inc.",
            code : "EBAY",
            price : 14
        }, {
          name: "Google",
          code: "GOOG",
          price: 45
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name : "Apple",
          code : "AAPL",
          price : 34
      },{
          name : "Marvell",
          code : "MRVL",
          price : 13
      },{
          name : "Cisco Systems",
          code : "CSCO",
          price : 65
      }, {
          name : "Intel",
          code : "INTC",
          price : 32
      }, {
          name : "Ebay Inc.",
          code : "EBAY",
          price : 14
      }
          ];
    }

    /**
     * Sets the selectedCompany.
     * @param company clicked company
     */
    onSelect(company : Company) {
        this.selectedCompany = company;
    }

    ngOnInit() {
        this.selectedCompany = this.companies[0];
    }

}