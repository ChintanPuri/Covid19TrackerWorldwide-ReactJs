import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class PanelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Col style={{height: '500px',
      paddingTop:'20px',
      paddingBottom: '210px',
      background: '#262424',
      position: 'relative',
      overflow: 'hidden' }}>

      <div className='heading' style={{marginTop:'20px',color:'white',fontSize:'22px',textAlign:'center',display:'none'}}>Covid 19 Tracker</div>
       <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:'20px',marginBottom:'50px',justifyContent:'center'}}>
           <div style={{color:'white',fontSize:'16px'}}>Total Cases : </div>
           <div style={{color:'white',marginLeft:'10px',fontSize:'22px'}}>{this.props.tcases}</div>
       </div>
        {this.props.content}

      </Col>
    );
  }
}

export default PanelHeader;
