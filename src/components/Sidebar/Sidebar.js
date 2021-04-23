import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";

import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo-white.svg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       newConfirmed: 0,
       newRecovered: 0,
       newDeaths: 0
    };
    this.activeRoute.bind(this);
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    fetch("https://corona.lmao.ninja/v3/covid-19/all")
      .then(res => res.json())
      .then(
        (result) => {
           this.setState({
             newConfirmed:this.numberWithCommas(result.todayCases),
             newRecovered:this.numberWithCommas(result.todayRecovered),
             newDeaths:this.numberWithCommas(result.todayDeaths),
           })
        }
      )
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a className="simple-text logo-normal" target="_blank" style={{marginLeft:'10px',fontSize:'15px'}}>
            Covid 19 Tracker
          </a>
        </div>

        <div className="sidebar-wrapper" ref="sidebar" style={{marginTop:'0px'}}>
          <Nav>
            <div style={{marginBottom:'20px',marginLeft:'20px',marginTop:'20px',fontSize:'18px',color:'white'}}>
              World Wide
            </div>
            <li style={{backgroundColor:'rgba(255,255,255,0.4)'}}>
              <div className="nav-link" style={{color:'white'}}>
                <p style={{fontSize:'10px',marginLeft:'20px',marginTop:'20px'}}>NEW CASES (LAST 24 HOURS)</p>
                <h3 style={{fontSize:'20px',marginLeft:'20px'}}>{this.state.newConfirmed}</h3>
              </div>
            </li>
            <li style={{backgroundColor:'rgba(255,255,255,0.4)',marginTop:'10px'}}>
              <div className="nav-link" style={{color:'white'}}>
                <p style={{fontSize:'10px',marginLeft:'20px',marginTop:'20px'}}>NEW RECOVERED (LAST 24 HOURS)</p>
                <h3 style={{fontSize:'20px',marginLeft:'20px'}}>{this.state.newRecovered}</h3>
              </div>
            </li>
            <li style={{backgroundColor:'rgba(255,255,255,0.4)',marginTop:'10px'}}>
              <div className="nav-link" style={{color:'white'}}>
                <p style={{fontSize:'10px',marginLeft:'20px',marginTop:'20px'}}>NEW DEATHS (LAST 24 HOURS)</p>
                <h3 style={{fontSize:'20px',marginLeft:'20px'}}>{this.state.newDeaths}</h3>
              </div>
            </li>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
