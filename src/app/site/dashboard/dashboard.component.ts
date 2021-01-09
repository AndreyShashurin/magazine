import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { SubscriptionLike } from 'rxjs';

import { DbService } from '../../shared/services/db.service';
import { personsInterface, tovarInterface } from '../../shared/services/interface.service';
import { HomeComponent } from '../home.component';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit, OnDestroy {
  appPageHeaderDivStyle: {};
  errorMessage: string;
  loggedInEmail: string = "";
  isLoggedIn: boolean;
  activeTab: boolean = true;
  activeStats: boolean = true;
  visibleFilter: boolean = false;
  persons: personsInterface[] =[];
  typeStats: number = 0; // Выручка-Средний чек
  typePeriod: number = 0; // неделя/месяц
  tovars: tovarInterface[] =[];
  subscription: SubscriptionLike;
  statuses = [
      {
        id: 0,
        name: 'Выручка',
        value: 0,
        percent: 0
      },
      {
        id: 1,
        name: 'Прибыль',
        value: 0,
        percent: 0
      },
      {
        id: 2,
        name: 'Чеков',
        value: 0,
        percent: 0
      },
      {
        id: 3,
        name: 'Средний чек',
        value: 0,
        percent: 0
      }
  ];

  public options: any = {
    chart: {
      type: 'column',
        height:"180px"
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
        renderTo: 'popular',
        type: 'pie',
    },
    colors: ['#FAD331', '#96D5DF', '#1BA8BB', '#C5D930', '#C1A0C5'],
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    legend: {
      enabled: true,
      floating: false,
      borderWidth: 0,
      align: 'right', 
      layout: 'vertical',
      verticalAlign: 'middle',
      itemMarginTop: 5,
      itemMarginBottom: 5,
      itemStyle: {
        lineHeight: "40px"
      },
      useHTML: true,
      labelFormatter: function() {
        return '<span style="display:block; margin-top:-10px; position:relative; width:210px;">&nbsp<span style="font-weight:normal; vertical-align:super;">' + this.name + ' </span><span style="font-weight:normal; vertical-align:super; position:absolute; right:0px;">' + this.y + '<br/></span></span>'; // right:0px; pulls the number to the right and keeps the text to the left
      }
    },
    plotOptions: {
        pie: {
          center: [60, 100],
          shadow: false,
        }
    },
    series: [{
        data: [],
        size: '80%',
        innerSize: '85%',
        showInLegend: true,
        dataLabels: {
          enabled: false
        }
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
    private homeComponent:HomeComponent,
    private settingsService: SettingsService
    ) {
  }


  toggleChart(...val: any) {
    this.typeStats = val[0]
    this.typePeriod = val[1]
    this.activeStats = val[1]
    const statusesFilter = this.statuses.filter(id => id.id === val[0])
               
    this.subscription = this.db.getHightcharsResponse(val[1]).subscribe(
        (response: Response) => { 
            this.options.series[0]['data'] = response['value'];
            this.options.xAxis.categories = response['key'];   
            this.popularTovar.series[0]['data'] = response['popular'];
            this.containerChart.series[0]['name'] = statusesFilter[0].name;
            if (val[0] >= 0 && val[1] === 1) {
                this.containerChart.title.text = `${statusesFilter[0].name} за месяц`;  
                this.containerChart.series[0]['data'] = [response['day']['monthLastValue'], response['day']['monthNowValue']];
                this.containerChart.xAxis.categories = [response['day']['monthLast'], response['day']['monthNow']]; 
            } else if(val[0] >= 0 && val[1] === 0) {
                this.containerChart.title.text = `${statusesFilter[0].name} за неделю`;  
                this.containerChart.series[0]['data'] = response['day']['sum'];
                this.containerChart.xAxis.categories = response['day']['title'].split(', '); 
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
    this.toggleChart(this.typeStats, this.typePeriod)
    this.settingsService.visibleFilterDunc(false)
  }
 
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
      
  }
}
