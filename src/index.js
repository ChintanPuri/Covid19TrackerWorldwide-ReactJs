import React, {Suspense, lazy} from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.4.0";
import "assets/css/demo.css";
import AdminLayout from 'layouts/Admin.js';


const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" render={(props) => <AdminLayout {...props} />} />
          <Redirect to="/" />
      </Switch>
    </Suspense>
  </Router>,
  document.getElementById("root")
);
