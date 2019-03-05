import { Component } from "@angular/core";

interface Company{
    name: string,
    code: string,
    price: number,
}

@Component({
    selector: "portfolio-user",
    templateUrl: "portfolio.html",
    styleUrls: ["portfolio.css"]
})
export class PortfolioComponent {
    company: Company;

    companies: Company[];

    constructor(){
        this.companies =[
        {
            name: "Google",
            code: "GOOG",
            price: 45
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        },{
            name: "Microsoft",
            code: "MSFT",
            price: 23
        }];

        this.companies.sort((a,b) =>{
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
    }

    show(c: Company){
        this.company=c;

    }
}