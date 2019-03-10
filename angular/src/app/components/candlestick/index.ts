import { Component, Input } from "@angular/core";
import { Price } from 'src/app/models/price';
declare let fc: any;
declare let d3: any;

@Component({
    selector: "candlestick",
    templateUrl: "candlestick.html",
    styleUrls: ["candlestick.css"]
})
export class CandlestickComponent{

    private _data: Price[];

    get data(){
        return this._data;
    }

    @Input("data")
    set data(d: Price[]){
        this._data = d;
        if(this._data !== null)
            this.rebuild();
    }

    rebuild(){
        let data = this.data;

        var yExtent = fc.extentLinear()
        .accessors([
            function(d) { return d.high; },
            function(d) { return d.low; }
        ]);

        var xExtent = fc.extentDate()
        .accessors([function(d) { return d.date; }]);

        var gridlines = fc.annotationSvgGridline();
        var candlestick = fc.seriesSvgCandlestick();
        var multi = fc.seriesSvgMulti()
            .series([gridlines, candlestick]);

        var chart = fc.chartSvgCartesian(
            fc.scaleDiscontinuous(d3.scaleTime()),
            d3.scaleLinear()
        )
        .yDomain(yExtent(data))
        .xDomain(xExtent(data))
        .plotArea(multi);
        
        d3.select('#chart')
        .datum(data)
        .call(chart);
    }
}