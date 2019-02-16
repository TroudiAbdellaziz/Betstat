/**
 * Created by mohma on 7/26/2017.
 */
import { Component, OnInit } from '@angular/core';
import { StatsCard } from "../components/statsCard/statsCard";
import { PieChart } from "../components/pieChart/pieChart";
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';
@Component({
  templateUrl: './dashboard.component.html',
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {




  // Doughnut
  public doughnutChartLabels: string[] = ['Paper won', 'Paper compensated', 'Paper lost'];
  public doughnutChartLabelsSystem: string[] = ['Papers with profit', 'Papers with loss'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartDataSystem: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';
  public pieChartType: string = 'pie';


  public chartHeight = 35;
  public userId: any;
  public user: any;
  public income: Number;
  public highBet: Number;
  public highPaper: Number;
  public highLoss: Number;
  public highStake: Number;
  public nb: Number;
  public loaded: Boolean = false;
  public ChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    mainAspectRatio: false
  };

  //Timeline Related
  public completeListener(item) {
    console.log(item);
    return true;
  }
  public timelineData: Array<Object> = [
    {
      title: "Step 1",
      icon: '<i class="fa fa-home"></i>',
      content: "Hello World",
      complete: true
    },
    {
      title: "Step 2",
      icon: '<i class="fa fa-pencil"></i>',
      content: "Welcome World",
      complete: false
    }
  ];
  constructor(private router: Router, private userService: UserService) {
    if (!localStorage.getItem("user")) {
      console.log("here")
      window.location.assign('/#/login');

    } else {
      this.userId = localStorage.getItem("user");
      console.log(localStorage.getItem("user"));

    }
  }
  ngOnInit(): void {

    let self = this;
    for (let i = 1; i < 31; i++) {
      this.lineChartLabels.push(i);
    }
    this.userService.getUser(this.userId).subscribe((res) => {
      if (res.success == true) {
        console.log("here");
        //console.log(res);
        this.user = res.user;
        console.log(this.user);
        let x = Math.round(parseInt(this.user.highPaper) / 100) * 100;
        console.log(x + 100);
        this.card1 = { color: "#1ebfae", icon: "fa-users", label: "Balance", data: Math.round(this.user.balance * 100) / 100 };
        this.card2 = { color: "#30a5ff", icon: "fa-cogs", label: "Papers", data: this.user.nbPapers };
        this.card3 = { color: "#ffb53e", icon: "fa-cogs", label: "Bets", data: this.user.bets };
        this.card4 = { color: "#f9243f", icon: "fa-cog", label: "Success rate", data: Math.round(this.user.success * 100) / 100 };
        this.pbar1 = { color: "#1ebfae", max: (Math.round(this.user.highPaper / 100) * 100) + 100, label: "Highest paper", current: this.user.highPaper };
        this.pbar2 = { color: "#30a5ff", max: (Math.round(this.user.highBet / 100) * 100) + 100, label: "Highest Bet", current: this.user.highBet };
        this.pbar3 = { color: "#ffb53e", max: (Math.round(this.user.highStake / 100) * 100) + 100, label: "Highest stake", current: this.user.highStake };
        this.pbar4 = { color: "#f9243f", max: (Math.round(this.user.highLoss / 100) * 100) + 100, label: "Highest loss", current: this.user.highLoss };

        // console.log(this.user.deposits);
        this.lineChartData = [{ data: this.user.deposits, label: 'Investment' },
        { data: this.user.incomeGenerated, label: 'Income generated' }];


        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        let news;
        console.log(this.user.transactions);
        for (let i = 0; i < this.user.transactions.length; i++) {
          let transaction = this.user.transactions[i];
          console.log(transaction);
          let date = transaction.date.split('-');
          let day = date[2].split('T')[0];
          console.log(date);
          news = {
            large: day,
            small: month[parseInt(date[1]) - 1],
            link: "http://www.aebiss.com",
            title: transaction.typeTransaction.toUpperCase(),
            content: transaction.description + " : " + transaction.money
          }
          this.newsList.push(news);

        }

        for (let i = 0; i < this.user.leagues.length; i++) {
          let league = this.user.leagues[i];
          console.log(league);
          news = {
            large: Math.round(league.rate * 100) + '%',
            small: league.nbBets + ' bets',
            title: league.name,
          }
          this.leagueList.push(news);

        }
        console.log(this.user);
        if((this.user.paperWon==0)&&(this.user.paperCompensated==0)&&(this.user.paperLost==0)){
          this.user.paperCompensated=1;
          this.user.paperCompensatedLost=1;
          this.user.paperLost=1;
          this.user.paperWon=1;
          this.user.paperCompensatedWon=1;
        }
        this.doughnutChartData=[this.user.paperWon, this.user.paperLost, this.user.paperCompensated]
        this.doughnutChartDataSystem=[this.user.paperCompensatedWon, this.user.paperCompensatedLost]

        this.loaded = true;

      }
      console.log("there");
    })
    setTimeout(function () {
      self.timelineData.push({
        title: "Step 3",
        icon: '<i class="fa fa-remove"></i>',
        content: "Bye World",
        complete: false
      });
    }, 5000);
  }

  //Card

  public card1: StatsCard;
  public card2: StatsCard;
  public card3: StatsCard;
  public card4: StatsCard;

  //ProgressBars
  public pbar1: PieChart;
  public pbar2: PieChart;
  public pbar3: PieChart;
  public pbar4: PieChart;


  // lineChart
  public lineChartData: Array<any> = [

  ];

  public lineChartLabels: Array<any> = [];

  public lineChartType: string = 'line';


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  //News Component
  public newsList: Array<Object> = [
  ]
  public leagueList: Array<Object> = [
  ]
}


