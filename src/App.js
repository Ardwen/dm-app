import React , { Suspense }from 'react';
import { Route,Switch,BrowserRouter } from "react-router-dom";
import LoginPage from "./view/LoginPage/LoginPage.js";
import RegisterPage from "./view/RegisterPage/RegisterPage.js";
import NavBar from "./view/NavBar/NavBar";
import ArtItemPage from "./view/ArtItemPage/ArtItemPage.js";
import DetailMuseumePage from "./view/MuseumeDetailPage/MuseumeDetailPage.js";
import MuseumeEditPage from "./view/MuseumeListPage/MuseumeEditPage.js";
import MuseumeListPage from "./view/MuseumeListPage/MuseumeListPage.js";
import UploadMuseumePage from "./view/uploadMuseume/uploadMuseumePage";
import LandingPage from "./view/LandingPage/LandingPage.js";
import Auth from "./Utils/Auth.js";
function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
    <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
          <BrowserRouter>
          <Switch>
          <Route exact path="/EditMuseume/:museumeId" component={MuseumeEditPage}/>
          <Route exact path="/ListMuseume" component={MuseumeListPage}/>
          <Route exact path="/Museume/:museumeId" component={DetailMuseumePage}/>
          <Route exact path="/artItem/:museumeId" component={ArtItemPage}/>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/upLoadMuseume" component={UploadMuseumePage}/>
          <Route exact path="/" component={LandingPage}/>
          </Switch>
          </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
