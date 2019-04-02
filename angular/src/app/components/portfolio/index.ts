import { Component, ChangeDetectorRef, OnInit, NgZone } from "@angular/core";
import { Price } from 'src/app/models/price';
import { Company } from 'src/app/models/company';
import { DataService } from 'src/app/services/data';
declare let fc: any;

interface Action{
    action: string;
    company: string;
    date: Date;
    quantity: number;
    price: number;
}

@Component({
    selector: "portfolio-user",
    templateUrl: "portfolio.html",
    styleUrls: ["portfolio.css"]
})
export class PortfolioComponent implements OnInit {
    company: Company;

    companies: Company[] = [];

    history: Action[];

    randomData: Price[] = null;

    ngOnInit(){
        this.data.getPortfolioSummary("aarroyoc").subscribe((data)=>this.updatePortfolio(data));
    }

    constructor(private data: DataService, private zone: NgZone ){

        this.history = [{
            action: "Comprar",
            company: "Google",
            date: new Date(),
            quantity: 5,
            price: 42
        },{
            action: "Vender",
            company: "Microsoft",
            date: new Date(),
            quantity: 7,
            price: 6
        },{
            action: "Comprar",
            company: "Google",
            date: new Date(),
            quantity: 5,
            price: 42
        },{
            action: "Vender",
            company: "Microsoft",
            date: new Date(),
            quantity: 7,
            price: 6
        },{
            action: "Comprar",
            company: "Google",
            date: new Date(),
            quantity: 5,
            price: 42
        },{
            action: "Vender",
            company: "Microsoft",
            date: new Date(),
            quantity: 7,
            price: 6
        },{
            action: "Comprar",
            company: "Google",
            date: new Date(),
            quantity: 5,
            price: 42
        },{
            action: "Vender",
            company: "Microsoft",
            date: new Date(),
            quantity: 7,
            price: 6
        }];
    }

    updatePortfolio(portfolio: Company[]){
        this.companies = portfolio;
        this.companies.sort((a,b) =>{
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
    }

    show(c: Company){
        this.company=c;
        this.randomData = fc.randomFinancial()(50);
    }
}