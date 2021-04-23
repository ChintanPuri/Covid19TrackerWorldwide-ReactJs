import React from "react";
import { Line } from "react-chartjs-2";
import "./style.css"
import Chart from "variables/charts.js";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tconfirmed:"",
      newConfirmed:"",
      tactive:"",
      trecovered:"",
      newRecovered:"",
      tdeaths:"",
      newDeaths:"",
      allCountries:[],
      a:0,
      b:6,
      displayCountry: false,
      countryName:{
        "country": "",
        "cases": 0,
        "todayCases": 0,
        "deaths": 0,
        "todayDeaths": 0,
        "recovered": 0,
        "todayRecovered": 0,
        "active": 0,
      },
      loader:true
    };
  }

  numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount(){
    fetch("https://corona.lmao.ninja/v3/covid-19/all")
      .then(res => res.json())
      .then(
        (result) => {
           this.setState({
             tconfirmed:this.numberWithCommas(result.cases),
             newConfirmed:this.numberWithCommas(result.todayCases),
             tactive:this.numberWithCommas(result.active),
             trecovered:this.numberWithCommas(result.recovered),
             newRecovered:this.numberWithCommas(result.todayRecovered),
             tdeaths:this.numberWithCommas(result.deaths),
             newDeaths:this.numberWithCommas(result.todayDeaths),
             activeC:result.active
           })
        }
      )
    fetch("https://corona.lmao.ninja/v3/covid-19/countries")
      .then(res => res.json())
      .then(
        (result) => {
          result.sort((a, b) => (a.cases < b.cases) ? 1 : -1);
           this.setState({
             allCountries:result
           });
        }
      )
      setTimeout( () => {
        this.setState({loader:false})
      },1400);
   }

  moveBack(){
    if(this.state.a <=6){
      this.setState({a:0,b:6})
    }
    else {
      this.setState({a:this.state.a-7,b:this.state.b-7})
    }
  }

  moveFor(){
    if(this.state.b>=221){
      this.setState({a:this.state.a,b:221})
    }
    else {
      this.setState({a:this.state.a+7,b:this.state.b+7})
    }
  }

  displayCountry(event){
    event.preventDefault();
    var countryName = document.getElementById('country').value;
    var countries = this.state.allCountries;
    for (var i=0; i < countries.length; i++) {
      if(countries[i].country.toLowerCase().replace(/\s/g, '') === countryName.toLowerCase().replace(/\s/g, '')){
        var { country , cases, active, recovered, deaths, todayCases, todayRecovered, todayDeaths}= countries[i];
        this.setState({displayCountry:true, countryName:{...this.state.countryName,country , cases, active, recovered, deaths, todayCases, todayRecovered, todayDeaths}});
      }
    }
  }

  back(){
    this.setState({displayCountry: false})
  }

  render() {
    return (
      <>
      {this.state.loader ?
      <div style={{height:'100vh',width:'100%',display:'flex',justifyContent:'center',flexDirection:'col-flex',backgroundColor:'rgba(255,255,255,0.5)',position:'absolute',zIndex:'10000000'}}>
        <div className='loader' style={{alignSelf:'center'}}></div>
      </div>:
      <div></div>
      }
        <PanelHeader
          size="lg"
          content={
            <Chart value="tconfirmed" />
          }
          tcases={this.state.tconfirmed}
        />
        <div className="content" style={{paddingBottom:'0px'}}>
          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Active</h5>
                  <CardTitle tag="h4">{this.state.tactive}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Chart value="tactive" />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Recovered</h5>
                  <CardTitle tag="h4">{this.state.trecovered}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Chart value="trecovered" />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Deaths</h5>
                  <CardTitle tag="h4">{this.state.tdeaths}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Chart value="tdeaths" />
                  </div>
                </CardBody>
                <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} style={{marginTop:'20px'}}>
              <Card>
              <Row style={{padding:'20px 10px 0px 40px',width:'100%',justifyContent:'space-between'}}>
                 {this.state.displayCountry === true ?
                   <div className='back-arrow' style={{marginBottom:'10px',marginTop:'20px',marginLeft:'10px',width:'15px',height:'20px',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}} onClick={this.back.bind(this)}></div>
                   :
                   <div></div>
                 }
                 <form onSubmit={this.displayCountry.bind(this)}>
                <InputGroup style={{marginTop:'10px',width:'300px'}}>
                  <Input placeholder="Search your Country" id='country'/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <div className='search-icon' onClick={this.displayCountry.bind(this)}></div>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                </form>
              </Row>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Country</th>
                        <th className="text-right">Total Cases</th>
                        <th className="text-right">Total Active</th>
                        <th className="text-right">Total Recovered</th>
                        <th className="text-right">Total Deaths</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.displayCountry === true ?
                      <tr>
                        <td>{this.state.countryName.country}</td>
                        <td className="text-right"><div style={{fontSize:'10px',marginBottom:'5px',color:'#0000FF'}}>(+{this.numberWithCommas(this.state.countryName.todayCases)})</div>{this.numberWithCommas(this.state.countryName.cases)}</td>
                        <td className="text-right">{this.numberWithCommas(this.state.countryName.active)}</td>
                        <td className="text-right"><div style={{fontSize:'10px',marginBottom:'5px',color:'#18ce00'}}>(+{this.numberWithCommas(this.state.countryName.todayRecovered)})</div>{this.numberWithCommas(this.state.countryName.recovered)}</td>
                        <td className="text-right"><div style={{fontSize:'10px',marginBottom:'5px',color:'#f96332'}}>(+{this.numberWithCommas(this.state.countryName.todayDeaths)})</div>{this.numberWithCommas(this.state.countryName.deaths)}</td>
                      </tr>
                      :
                      this.state.allCountries.map((country, index) => {
                        return (
                          (index<=(this.state.b)&&index>=(this.state.a))?
                          <tr>
                            <td>{country.country}</td>
                            <td className="text-right"><div style={{fontSize:'10px',marginBottom:'5px',color:'#0000FF'}}>(+{this.numberWithCommas(country.todayCases)})</div>{this.numberWithCommas(country.cases)}</td>
                            <td className="text-right">{this.numberWithCommas(country.active)}</td>
                            <td className="text-right"><div style={{fontSize:'10px',marginBottom:'5px',color:'#18ce00'}}>(+{this.numberWithCommas(country.todayRecovered)})</div>{this.numberWithCommas(country.recovered)}</td>
                            <td className="text-right"><div style={{fontSize:'10px',marginBottom:'5px',color:'#f96332'}}>(+{this.numberWithCommas(country.todayDeaths)})</div>{this.numberWithCommas(country.deaths)}</td>
                          </tr>
                          : <span></span>
                        )
                      })
                    }
                    </tbody>
                  </Table>
                  {this.state.displayCountry ?
                    <span></span>
                    :
                  <Row style={{justifyContent:'center'}}>
                     <div className='left-arrow' style={{marginBottom:'20px',width:'35px',height:'35px',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}} onClick={this.moveBack.bind(this)}></div>
                     <div className='right-arrow' style={{marginLeft:'10px',width:'35px',height:'35px',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}} onClick={this.moveFor.bind(this)}></div>
                  </Row>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
