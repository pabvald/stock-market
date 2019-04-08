import { Component, ChangeDetectorRef, OnInit, NgZone } from "@angular/core";
import { CandlestickComponent } from "src/app/components/candlestick";
import { Price } from 'src/app/models/price';
import { Company } from 'src/app/models/company';
import { Action } from 'src/app/models/action';
import { Indicator } from 'src/app/models/indicator';
import { DataService } from 'src/app/services/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare let fc: any;


@Component({
    selector: "market-page",
    templateUrl: "market.html",
    styleUrls:["market.css"]
})
export class MarketComponent{
    
    lowerEndsPrice  = [ 0, 10, 20, 30, 50, 70, 100, 150 ];
    upperEndsPrice  = [ 10, 20, 30, 50, 70, 100, 150, 200,
                        1000, 2000, 3000, 4000, 10000, 20000 ].reverse();
    indicators =  [ { name: "MMS", displayName: "Media móvil simple" },
                    { name: "MME", displayName: "Media móvil exponencial" },
                    { name: "MMP", displayName: "Media móvil ponderada" },
                    { name: "RSI", displayName: "RSI" },
                    { name: "MACD",displayName: "MACD" },
                    { name: "WR",  displayName: "William %R" }
                ]; 
 
    companies : Company[];

    searchedName : string = "";
    searchedCode : string = "";

    lowerPrice : number;
    upperPrice : number;   

    numberBuyStocks : number;
    selectedCompany : Company;
    selectedIndicator : Indicator;

    companyEvolution : Price[] = null;
    
    /**
     * Do initialization operations.
     */
    ngOnInit() {
        this.updateMarket();
         
        this.selectedIndicator = this.indicators[0];
        this.lowerPrice = this.lowerEndsPrice[0];
        this.upperPrice = this.upperEndsPrice[0];
    }

    constructor(private dataService : DataService) { }

    /**
     * Update the companies in the stock market.
     */
    updateMarket() {
        this.dataService.getMarket().subscribe((data)=>this.setCompanies(data));          
    }

    /**
     * Update the selected company's stock price.
     */
    updateEvolution() {
        this.dataService.getCompanyEvolution(this.selectedCompany.code).subscribe((data)=>this.setCompanyEvolution(data));  
    }

    /**
     * Set the companies. 
     * @param cs - all the companies in the stock market.
     */
    setCompanies(cs: Company[] ){
        this.companies = cs;
        this.companies.sort((a,b) =>{
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }); 
    }

    /**
     * Set the evolution of the selected Company.
     * @param evoution - the evolution of the selected company's stock price.
     */
    setCompanyEvolution(evolution : Price[]) {
        this.companyEvolution = evolution;
    }

    /**
     * Filters the showed companies based on the selection made by the user.
     */
    getSearchedCompanies() : Company[] {
        let searchedCompanies : Company[]  = this.companies.filter(c => c.price >= this.lowerPrice)
                                                           .filter(c => c.price <= this.upperPrice);
        if (this.searchedName !== "" ) {
            searchedCompanies = searchedCompanies.filter(c => c.name.toUpperCase().includes(this.searchedName.trim().toUpperCase()));
        }
        if (this.searchedCode !== "") {
            searchedCompanies = searchedCompanies.filter(c => c.code.includes(this.searchedCode.trim().toUpperCase()));   
        }
        return searchedCompanies;
    }
    

    /**
     * Set the selectedCompany.
     * @param company -  clicked company
     */
    onSelectCompany(selected : Company){
        this.selectedCompany = selected;
        // this.updateEvolution(); 
        this.companyEvolution = fc.randomFinancial()(50);
    }

    /**
     * Set the selected indicator.
     * @param selected 
     */
    onSelectIndicator(selected : Indicator) {
        this.selectedIndicator = selected;
    }

    /**
     * Do the stock purchase.
     */
    buy()  {
        if(this.numberBuyStocks < 1) return;

        let data = {
            id: this.selectedCompany.id,
            number : this.numberBuyStocks
        };

        this.dataService.buyStocks(data).subscribe((text)=>{
            if (text.ok) {
                alert("La operación ha sido realizada correctamente");
            } else {
                alert("Hubo un problema con la petición");
            }
        });
    }
    
}