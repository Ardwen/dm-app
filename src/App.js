import React , { Suspense }from 'react';
import { Route,Switch,BrowserRouter } from "react-router-dom";
import LoginPage from "./view/LoginPage/LoginPage.js";
import RegisterPage from "./view/RegisterPage/RegisterPage.js";
import NavBar from "./view/NavBar/NavBar";
import RegisterPage from "./view/ArtItemPage/RegisterPage.js";
//pages for product
import UploadMuseumePage from "./view/uploadMuseume/uploadMuseumePage"
import Auth from "./Utils/Auth.js";
function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
    <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
          <BrowserRouter>
          <Switch>
          <Route exact path="/museume/:museumeId" component={DetailProductPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/" component={UploadMuseumePage} />
          </Switch>
          </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
