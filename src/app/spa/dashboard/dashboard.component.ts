import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { SubscriptionLike } from 'rxjs';

import { DbService } from 'src/app/db.service';
import { personsInterface, tovarInterface } from 'src/app/services/interface.service';
import { HomeComponent } from '../home.component';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit, OnDestroy {
  appPageHeaderDivStyle: {};
  errorMessage: string;
  loggedInEmail: string = "";
  isLoggedIn: boolean;
  persons: personsInterface[] =[];
  data = '1';
  tovars: tovarInterface[] =[];
  subscription: SubscriptionLike;
  
  public options: any = {
    chart: {
      type: 'column',
      height:"200px"
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },     
    xAxis: {
        categories: []
    },
    tooltip: {
        formatter: function() {
            return'<strong>'+ this.y+'</strong>';
        }
    },
    legend: {
        enabled: false
    },    
    plotOptions: {
        series: {
            //borderColor: ''
        }
    },
    series: [{
        name: '',
        color: "#f7626c",
        data: []
    }]
  }
  public popularTovar: any = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    legend: {
        enabled: false
    },   
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true,            
            innerSize: 30,
        }
    },
    series: [{
        name: '',
        colorByPoint: true,
        data: []
    }]
  }

  public containerChart: any = {
    chart: {
        type: 'areaspline'
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5,
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]]
                ]
            },
            marker: {
                radius: 4
            },
            lineWidth: 2
        }
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        className: 'highcharts-color-0',
        title: {
            text: ''
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' '
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Выручка',
        data: []
    }]
  }
  
  constructor( 
    private db: DbService,
    private http: HttpClient,
    private homeComponent:HomeComponent
    ) {
  }


  toggleChart(data) {
    this.subscription = this.db.getHightcharsResponse(data).subscribe(
        (response: Response) => { 
            this.options.series[0]['data'] = response['value'];
            this.options.xAxis.categories = response['key'];   
            this.popularTovar.series[0]['data'] = response['popular']; 
            if (data == 1) {
                this.containerChart.title.text = "Выручка за неделю";  
                this.containerChart.series[0]['data'] = response['day']['sum'];
                this.containerChart.xAxis.categories = response['day']['title'].split(', '); 
            } else {
                this.containerChart.title.text = "Выручка за месяц";  
                this.containerChart.series[0]['data'] = [response['day']['monthLastValue'], response['day']['monthNowValue']];
                this.containerChart.xAxis.categories = [response['day']['monthLast'], response['day']['monthNow']]; 
            }    
            Highcharts.chart('wrap-container', this.options); 
            Highcharts.chart('popular-chart', this.popularTovar);
            Highcharts.chart('container_chart', this.containerChart);
        },
        (error) => {console.log(error);
        () => this.subscription.unsubscribe()
        }
    )
  }

  ngOnInit() {  
    this.subscription = this.db.getUsers().subscribe(
        (response) => { 
            this.persons = response
        },
        (error) => {
            console.log(error)
        }
    )

    this.subscription = this.db.getTovars().subscribe(
        (response) => { 
            this.tovars = response
        },
        (error) => {
            console.log(error)
        }
    )  
    this.toggleChart(this.data)
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
      
  }
}
