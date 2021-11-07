import { Component, NgZone, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-amchart',
  templateUrl: './amchart.component.html',
  styleUrls: ['./amchart.component.scss']
})
export class AmchartComponent implements OnInit {

  private chart: any;

  constructor(private zone: NgZone) {
    this.chart = am4charts.XYChart;
  }

  ngAfterViewInit() {
    this.chartA();
    this.chartB();
    // this.chartC();
    this.chartD();
    this.chartF();
  }

  chartA() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdivA", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2020, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.tooltip.disabled = true;
      // valueAxis.tooltip?.__disabled = true;      
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  chartD() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdivD", am4charts.XYChart);
      let data = [];
      let value = 50;
      for (let i = 0; i < 300; i++) {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(i);
        value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: date, value: value });
      }

      chart.data = data;

      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.tooltipText = "{value}"

      // series.tooltip.pointerOrientation = "vertical";

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.snapToSeries = series;
      chart.cursor.xAxis = dateAxis;

      //chart.scrollbarY = new am4core.Scrollbar();
      chart.scrollbarX = new am4core.Scrollbar();
    });
  }

  chartB() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdivB", am4charts.XYChart);
      // Increase contrast by taking evey second color
      chart.colors.step = 2;

      // Add data
      chart.data = generateChartData();

      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;

      // Create series
      function createAxisAndSeries(field: any, name: any, opposite: any, bullet: any) {
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.yAxis = valueAxis;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.tensionX = 0.8;

        let interfaceColors = new am4core.InterfaceColorSet();
        let chartbullet = series.bullets.push(new am4charts.Bullet());
        switch (bullet) {
          case "triangle":
            chartbullet = series.bullets.push(new am4charts.Bullet());
            chartbullet.width = 12;
            chartbullet.height = 12;
            chartbullet.horizontalCenter = "middle";
            chartbullet.verticalCenter = "middle";

            let triangle = chartbullet.createChild(am4core.Triangle);
            triangle.stroke = interfaceColors.getFor("background");
            triangle.strokeWidth = 2;
            triangle.direction = "top";
            triangle.width = 12;
            triangle.height = 12;
            break;
          case "rectangle":
            chartbullet = series.bullets.push(new am4charts.Bullet());
            chartbullet.width = 10;
            chartbullet.height = 10;
            chartbullet.horizontalCenter = "middle";
            chartbullet.verticalCenter = "middle";

            let rectangle = chartbullet.createChild(am4core.Rectangle);
            rectangle.stroke = interfaceColors.getFor("background");
            rectangle.strokeWidth = 2;
            rectangle.width = 10;
            rectangle.height = 10;
            break;
          default:
            let bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.stroke = interfaceColors.getFor("background");
            bullet.circle.strokeWidth = 2;
            break;
        }

        valueAxis.renderer.line.strokeOpacity = 1;
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = series.stroke;
        valueAxis.renderer.labels.template.fill = series.stroke;
        valueAxis.renderer.opposite = opposite;
        valueAxis.renderer.grid.template.disabled = true;
      }

      createAxisAndSeries("visits", "Visits", false, "circle");
      createAxisAndSeries("views", "Views", true, "triangle");
      createAxisAndSeries("hits", "Hits", true, "rectangle");

      // Add legend
      chart.legend = new am4charts.Legend();

      // Add cursor
      chart.cursor = new am4charts.XYCursor();

      // generate some random data, quite different range
      function generateChartData() {
        let chartData = [];
        let firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);
        firstDate.setHours(0, 0, 0, 0);

        let visits = 1600;
        let hits = 2900;
        let views = 8700;

        for (var i = 0; i < 15; i++) {
          // we create date objects here. In your data, you can have date strings
          // and then set format of your dates using chart.dataDateFormat property,
          // however when possible, use date objects, as this will speed up chart rendering.
          let newDate = new Date(firstDate);
          newDate.setDate(newDate.getDate() + i);

          visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          hits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          views += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

          chartData.push({
            date: newDate,
            visits: visits,
            hits: hits,
            views: views
          });
        }
        return chartData;
      }

    });
  }

  chartF() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdivF", am4charts.XYChart);

      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      // Add data
      chart.data = [{
        "x": 1,
        "ay": 6.5,
        "by": 2.2,
        "aValue": 15,
        "bValue": 10
      }, {
        "x": 2,
        "ay": 12.3,
        "by": 4.9,
        "aValue": 8,
        "bValue": 3
      }, {
        "x": 3,
        "ay": 12.3,
        "by": 5.1,
        "aValue": 16,
        "bValue": 4
      }, {
        "x": 5,
        "ay": 2.9,
        "aValue": 9
      }, {
        "x": 7,
        "by": 8.3,
        "bValue": 13
      }, {
        "x": 10,
        "ay": 2.8,
        "by": 13.3,
        "aValue": 9,
        "bValue": 13
      }, {
        "x": 12,
        "ay": 3.5,
        "by": 6.1,
        "aValue": 5,
        "bValue": 2
      }, {
        "x": 13,
        "ay": 5.1,
        "aValue": 10
      }, {
        "x": 15,
        "ay": 6.7,
        "by": 10.5,
        "aValue": 3,
        "bValue": 10
      }, {
        "x": 16,
        "ay": 8,
        "by": 12.3,
        "aValue": 5,
        "bValue": 13
      }, {
        "x": 20,
        "by": 4.5,
        "bValue": 11
      }, {
        "x": 22,
        "ay": 9.7,
        "by": 15,
        "aValue": 15,
        "bValue": 10
      }, {
        "x": 23,
        "ay": 10.4,
        "by": 10.8,
        "aValue": 1,
        "bValue": 11
      }, {
        "x": 24,
        "ay": 1.7,
        "by": 19,
        "aValue": 12,
        "bValue": 3
      }];

      // Create axes
      let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
      xAxis.renderer.minGridDistance = 40;

      // Create value axis
      let yAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series1 = chart.series.push(new am4charts.LineSeries());
      series1.dataFields.valueX = "x";
      series1.dataFields.valueY = "ay";
      series1.dataFields.value = "aValue";
      series1.strokeWidth = 2;

      let bullet1 = series1.bullets.push(new am4charts.CircleBullet());
      series1.heatRules.push({
        target: bullet1.circle,
        min: 5,
        max: 20,
        property: "radius"
      });

      bullet1.tooltipText = "{valueX} x {valueY}: [bold]{value}[/]";

      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.valueX = "x";
      series2.dataFields.valueY = "by";
      series2.dataFields.value = "bValue";
      series2.strokeWidth = 2;

      let bullet2 = series2.bullets.push(new am4charts.CircleBullet());
      series2.heatRules.push({
        target: bullet2.circle,
        min: 5,
        max: 20,
        property: "radius"
      });

      bullet2.tooltipText = "{valueX} x {valueY}: [bold]{value}[/]";

      //scrollbars
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarY = new am4core.Scrollbar();
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
