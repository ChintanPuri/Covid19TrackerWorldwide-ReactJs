import React from "react";
import { Line } from "react-chartjs-2";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: [],
      active: [],
      recovered: [],
      deaths: [],
      activeC: 0,
      length: 0
    };
  }

  getDate(){
    var label = [];
    var date = new Date();
    date.setDate(date.getDate() - 20);
    for( var i = 1; i <= 20 ; i++){
      label.push(date.toDateString().slice(4,15));
      date.setDate(date.getDate() + 1);
    }
   return label;
  }

  hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  getdata(type){
    if(type === "tconfirmed") {
      return ( (canvas) => {
        const ctx = canvas.getContext("2d");
        var chartColor = "#FFFFFF";
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#80b6f4");
        gradientStroke.addColorStop(1, chartColor);
        var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.14)");

        return {
          labels: this.getDate(),
          datasets:[
            {
              label: " ",
              borderColor: chartColor,
              pointBorderColor: chartColor,
              pointBackgroundColor: "#2c2c2c",
              pointHoverBackgroundColor: "#2c2c2c",
              pointHoverBorderColor: chartColor,
              pointBorderWidth: 0,
              pointHoverRadius: 0,
              pointHoverBorderWidth: 0,
              pointRadius: 0,
              fill: true,
              backgroundColor: gradientFill,
              borderWidth: 2,
              data: this.state.confirmed,
            }
          ],
        }
      })
    } else if(type === "tactive"){
      return ( (canvas) => {
        var ctx = canvas.getContext("2d");
        const chartColor = "#FFFFFF";
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#2CA8FF");
        gradientStroke.addColorStop(1, chartColor);
        var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, this.hexToRGB("#2CA8FF", 0.6));
        return {
          labels: this.getDate(),
          datasets: [
            {
              label: " ",
              borderColor: "#2CA8FF",
              pointBorderColor: "#FFF",
              pointBackgroundColor: "#2CA8FF",
              pointBorderWidth: 0,
              pointHoverRadius: 0,
              pointHoverBorderWidth: 0,
              pointRadius: 0,
              fill: true,
              backgroundColor: gradientFill,
              borderWidth: 2,
              data: this.state.active,
            },
          ],
        }
      })
    } else if (type === "trecovered") {
      return ( (canvas) => {
        var ctx = canvas.getContext("2d");
        const chartColor = "#FFFFFF";
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#18ce0f");
        gradientStroke.addColorStop(1, chartColor);
        var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, this.hexToRGB("#18ce0f", 0.4));
        return {
          labels:this.getDate(),
          datasets: [
            {
              label: " ",
              borderColor: "#18ce0f",
              pointBorderColor: "#FFF",
              pointBackgroundColor: "#18ce0f",
              pointBorderWidth: 0,
              pointHoverRadius: 0,
              pointHoverBorderWidth: 0,
              pointRadius: 0,
              fill: true,
              backgroundColor: gradientFill,
              borderWidth: 2,
              data: this.state.recovered,
            },
          ],
        };
      })
    } else if (type === "tdeaths") {
      return ( (canvas) => {
        var ctx = canvas.getContext("2d");
        const chartColor = "#FFFFFF";
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#80b6f4");
        gradientStroke.addColorStop(1, chartColor);
        var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
        return {
          labels: this.getDate(),
          datasets: [
            {
              label: " ",
              borderColor: "#f96332",
              pointBorderColor: "#FFF",
              pointBackgroundColor: "#f96332",
              pointBorderWidth: 0,
              pointHoverRadius: 0,
              pointHoverBorderWidth: 0,
              pointRadius: 0,
              fill: true,
              backgroundColor: gradientFill,
              borderWidth: 2,
              data: this.state.deaths,
            },
          ],
        }
      })
    }
  }

  getOptions(type){
    if(type === "tconfirmed"){
      return ({
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0,
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "#fff",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
        legend: {
          position: "bottom",
          fillStyle: "#FFF",
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                display: true,
                fontColor: "rgba(255,255,255,0.4)",
                fontStyle: "bold",
                beginAtZero: false,
                maxTicksLimit: 5,
                padding: 10,
                callback: function(value, index, values) {
                        return (value/1000000) + " M";
                    }
              },
              gridLines: {
                drawTicks: true,
                drawBorder: false,
                display: true,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                color: "rgba(255,255,255,0.1)",
              },
              ticks: {
                display: false,
                padding: 10,
                fontColor: "rgba(255,255,255,0.4)",
                fontStyle: "bold",
              },
            },
          ],
        },
      });
    } else {
      return ({
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10,
        },
        responsive: 1,
        scales: {
          yAxes: [
            {
              display: 0,
              ticks: {
                display: false,
                maxTicksLimit: 7,
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false,
              },
            },
          ],
          xAxes: [
            {
              display: 0,
              ticks: {
                display: false,
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false,
              },
            },
          ],
        },
        layout: {
          padding: { left: 0, right: 0, top: 15, bottom: 15 },
        },
      });
    }
  }

  componentDidMount(){
    var a = 0;
    fetch("https://corona.lmao.ninja/v3/covid-19/all")
      .then(res => res.json())
      .then(
        (result) => {
          a=result.active;
        }
      ).then (
        (res) => {
          fetch("https://corona-api.com/timeline")
            .then(res => res.json())
            .then(
              (result) => {
                var confirmed = [], active = [], recovered = [], deaths = [];
                var incActive = result.data[1].active - a;
                var length = result.data.length;
                this.setState({length: length});
                for( var i = 20; i > 0; i--){
                  confirmed.push(result.data[i].confirmed);
                  active.push(result.data[i].active - incActive - 100000);
                  recovered.push(result.data[i].confirmed - (result.data[i].active - incActive - 100000 + result.data[i].deaths));
                  deaths.push(result.data[i].deaths);
                }
                this.setState({
                  confirmed:confirmed,
                  active: active,
                  recovered: recovered,
                  deaths: deaths
                });
              }
            )
        }
      )

   }

  render() {
    return (
      <Line
        data={this.getdata(this.props.value)}
        options={this.getOptions(this.props.value)}
      />
    );
  }
}

export default Chart;
