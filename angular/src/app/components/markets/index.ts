import { Component } from "@angular/core";


interface Company{
    name: string,
    code: string,
    price: number,
}

interface Indicator {
    name : string,
    displayName : string
}

@Component({
    selector: "market-page",
    templateUrl: "market.html",
    styleUrls:["market.css"]
})
export class MarketComponent{
    
    lowerEndsPrice : number[] ;
    upperEndsPrice : number[] ;
    indicators : Indicator[] ;                 
    companies : Company[];

    searchedName : string = "";
    searchedCode : string = "";
    lowerPrice : number;
    upperPrice : number;   
    selectedCompany : Company;
    selectedIndicator : Indicator;
   
    constructor() { }

    /**
     * Filters the showed companies based on the selection made by the user.
     */
    getSearchedCompanies() : Company[] {
        let searchedCompanies : Company[]  = this.companies.filter(c => c.price >= this.lowerPrice)
                                                           .filter(c => c.price <= this.upperPrice);
        if(this.searchedName !== "" ) 
            searchedCompanies = searchedCompanies.filter(c => c.name.toUpperCase().includes(this.searchedName.trim().toUpperCase()));
        
        if(this.searchedCode !== "") 
            searchedCompanies = searchedCompanies.filter(c => c.code.includes(this.searchedCode.trim().toUpperCase()));   

        return searchedCompanies;
    }

    /**
     * Sets the selectedCompany.
     * @param company clicked company
     */
    onSelectCompany(selected : Company) {
        this.selectedCompany = selected;
    }

    /**
     * Sets the selected indicator.
     * @param selected 
     */
    onSelectIndicator(selected : Indicator) {
        this.selectedIndicator = selected;
    }

    /**
     * Does initialization operations.
     */
    ngOnInit() {
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
        } ];

       this.companies.sort((a,b) =>{
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });   
        
        this.lowerEndsPrice  = [ 0, 10, 20, 30, 50, 70, 100, 150];
        this.upperEndsPrice  = [10, 20, 30, 50, 70, 100, 150, 200].reverse();
        this.indicators =  [ {name: "MMS", displayName:  "Media móvil simple"},
                             {name: "MME", displayName: "Media móvil exponencial"},
                             {name: "MMP", displayName: "Media móvil ponderada"},
                             {name: "RSI", displayName: "RSI"},
                             {name: "MACD",displayName:  "MACD"},
                             {name: "WR",  displayName:  "William %R"}
                            ];
        
        this.selectedCompany = this.companies[0];
        this.selectedIndicator = this.indicators[0];
        this.lowerPrice = this.lowerEndsPrice[0];
        this.upperPrice = this.upperEndsPrice[0];

    }

}