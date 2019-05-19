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
    private _indicator: string;

    get data(){
        return this._data;
    }

    @Input("data")
    set data(d: Price[]){
        this._data = d;
        if(this._data !== null)
            this.rebuild();
    }

    @Input("indicator")
    set indicator(d: string){
        this._indicator = d;
        this.rebuild();
    }

    rebuild(){
        let data = this.data;
        for(let bar of data){
            bar.date = new Date(bar.date);
        }

        var yExtent = fc.extentLinear()
        .accessors([
            function(d) { return d.high; },
            function(d) { return d.low; }
        ]);

        var xExtent = fc.extentDate()
        .accessors([function(d) { return d.date; }]);

        var gridlines = fc.annotationSvgGridline();
        var candlestick = fc.seriesSvgCandlestick();

        let indicator = null;
        let mergedData = data;
        if(this._indicator === "MMS"){
            const ma = fc.indicatorMovingAverage()
            .value(d => d.open);
            const maData = ma(data);
            indicator = fc.seriesSvgLine()
                .mainValue(d => d.ma)
                .crossValue(d => d.date);
            mergedData = data.map((d, i) =>
                Object.assign({}, d, {
                    ma: maData[i]
                })
            );
        }
        if(this._indicator === "MME"){
            const ma = fc.indicatorExponentialMovingAverage()
            .value(d => d.open);
            const maData = ma(data);
            indicator = fc.seriesSvgLine()
                .mainValue(d => d.ma)
                .crossValue(d => d.date);
            mergedData = data.map((d, i) =>
                Object.assign({}, d, {
                    ma: maData[i]
                })
            );
        }
        if(this._indicator === "MACD"){
            const ma = fc.indicatorMacd()
            .value(d => d.open);
            const maData = ma(data);
            console.log(maData);
            indicator = fc.seriesSvgLine()
                .mainValue(d => d.ma)
                .crossValue(d => d.date);
            mergedData = data.map((d, i) =>
                Object.assign({}, d, {
                    ma: maData[i].signal
                })
            );
        }
        


        if(indicator !== null){
            var multi = fc.seriesSvgMulti()
            .series([gridlines, candlestick,indicator]);
        }else{
            var multi = fc.seriesSvgMulti()
            .series([gridlines, candlestick]);
        }
        



        var chart = fc.chartSvgCartesian(
            fc.scaleDiscontinuous(d3.scaleTime()),
            d3.scaleLinear()
        )
        .yDomain(yExtent(mergedData))
        .xDomain(xExtent(mergedData))
        .plotArea(multi);
        
        d3.select('#chart')
        .datum(mergedData)
        .call(chart);
    }
}