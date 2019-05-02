import { Component, ChangeDetectorRef, OnInit, NgZone,NgModule, ɵNgOnChangesFeature } from "@angular/core";
import { CandlestickComponent } from "src/app/components/candlestick";
import { Price } from 'src/app/models/price';
import { Company } from 'src/app/models/company';
import { Action } from 'src/app/models/action';
import { Indicator, IndicatorValue } from 'src/app/models/indicator';
import { DataService } from 'src/app/services/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from 'src/app/services/state';
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
    indicators =  [ { name: "MMS",  displayName: "Media móvil simple" },
                    { name: "MME",  displayName: "Media móvil exponencial" },
                    { name: "MMP",  displayName: "Media móvil ponderada" },
                    { name: "RSI",  displayName: "RSI" },
                    { name: "MACD", displayName: "MACD" },
                    { name: "WR",   displayName: "William %R" },
                    { name: "NONE", displayName: "Ninguno"}
                ]; 
 
    companies : Company[];

    searchedName : string = "";
    searchedCode : string = "";

    lowerPrice : number;
    upperPrice : number;   

    numberBuyStocks : number;
    selectedCompany : Company;
    selectedIndicator : Indicator;

    priceEvolution : Price[] = null;
    indicatorEvolution: IndicatorValue[] = null;

    nickname : string;
    
    /**
     * Do initialization operations.
     */
    ngOnInit() {
        this.updateMarket();
        this.selectedIndicator = this.indicators[this.indicators.length-1];
        this.lowerPrice = this.lowerEndsPrice[0];
        this.upperPrice = this.upperEndsPrice[0];
    }

    constructor( private dataService : DataService, private stateService : StateService) { 
        this.nickname = this.stateService.nickname;
    }

    /**
     * Update the companies in the stock market.
     */
    updateMarket() {
        this.dataService.getMarket().subscribe((data)=>this.setCompanies(data));          
    }

    /**
     * Update the selected company's stock price evolution and its indicator.
     */
    updateCompanyEvolution() {
        this.dataService.getPriceEvolution(this.selectedCompany.code).subscribe((data)=>this.setPriceEvolution(data));  
        this.dataService.getIndicatorEvolution(this.selectedCompany.code, this.selectedIndicator.name).subscribe((data)=>this.setIndicatorEvolution(data));
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
        this.selectedCompany = this.companies[0]; 
        this.updateCompanyEvolution();     
    }

    /**
     * Set the evolution of the selected Company.
     * @param evolution - the evolution of the selected company's stock price.
     */
    setPriceEvolution(evolution : Price[]) {
        this.priceEvolution = evolution;       
    }

    /**
     * Set the evolution of the selected indicator
     * @param evolution - the evolution of selected indicator's value.
     */
    setIndicatorEvolution(evolution : IndicatorValue[]) {
        this.indicatorEvolution = evolution;
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
     * @param selected -  clicked company
     */
    onSelectCompany(selected : Company) {
        this.selectedCompany = selected;
        this.updateEvolution(); 
    }

    /**
     * Set the selectedIndicator.
     * @param selected - selected indicator.
     */
    onSelectIndicator() {
        console.log("Indicador: " + this.selectedIndicator.displayName);
    }


    /**
     * Do the stock purchase.
     */
    buy()  {
        if (this.numberBuyStocks < 1 || !this.numberBuyStocks) {
            alert("El número de acciones a comprar debe ser mayor o igual que 1.");
            return;
        }

        let data = {
            id: this.selectedCompany.id,
            number : this.numberBuyStocks
        };

        this.dataService.buyStocks(data).subscribe((response)=>{
            if (response.error == 0) {
                alert("La operación ha sido realizada correctamente");
            } else if(response.error == 2) {
                alert("Su saldo actual no es suficiente para comprar este número de acciones.")
            } else {
                alert("Hubo un problema con la petición. Por favor, inténtelo de nuevo más tarde ");
            }
        });
    }
    
}