import { Component, ChangeDetectorRef, OnInit, NgZone } from "@angular/core";
import { Price } from 'src/app/models/price';
import { Company } from 'src/app/models/company';
import { Action } from 'src/app/models/action';
import { DataService } from 'src/app/services/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare let fc: any;

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
        this.data.getPortfolioHistory("aarroyoc").subscribe((data)=>this.updateHistory(data));
        // MOSTRAR GRAFICOS
        // CALCULAR BENEFICIOS
        // FORMATO DECIMALES
        // BOTON VENDER
        // ACTUALIZAR INFO GENERICA
        
    }

    constructor(private data: DataService){

    }

    updatePortfolio(portfolio: Company[]){
        this.companies = portfolio;
        this.companies.sort((a,b) =>{
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
    }

    updateHistory(history: Action[]){
        this.history = history.map((h)=>{
            if(h.action == "buy"){
                h.action = "Compra";
            }else if(h.action == "sell"){
                h.action = "Venta";
            }
            return h;
        });
    }

    show(c: Company){
        this.company=c;
        this.randomData = fc.randomFinancial()(50);
    }
}