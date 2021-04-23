import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import "./style.css";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <div className="copyright" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <div>Developed by <a href='https://www.linkedin.com/in/chintan-puri-52369019a/' target="_blank">Chintan Puri</a></div>
            <a href='https://www.linkedin.com/in/chintan-puri-52369019a/' target="_blank"><div className='linkedin-icon' style={{marginLeft:'5px'}}></div></a>
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
