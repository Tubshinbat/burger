import React, { Component } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";

import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";
import OrderPage from "../OrderPage";
import { Redirect, Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import Burger from "../../components/Burger";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import Logout from "../../components/Logout";
import * as actions from "../../redux/actions/loginActions";
import * as signupAction from "../../redux/actions/signupActions";

class App extends Component {
  state = {
    showSidebar: false
  };


  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expireDate = new Date(localStorage.getItem('expireDate'));
    const refreshToken = localStorage.getItem('refreshToken');

  
    if(token){
      if(expireDate > new Date()){
        this.props.autoLogin(token,userId);
        this.props.autoLogoutAfterMillisec(expireDate.getTime() - new Date().getTime())
      }else{
        // Token hugatsaa n duusan bain
        this.props.logout();

      }
    }
  }

  toggleSideBar = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />

        <SideBar
          showSidebar={this.state.showSidebar}
          toggleSideBar={this.toggleSideBar}
        />

        <main className={css.Content}>
          UserID: {this.props.userId}

          {this.props.userId 
          ?(
            <Switch>
              <Route path="/orders" component={OrderPage} />
              <Route path="/ship" component={ShippingPage} />
              <Route path="/logout" component={Logout} />
              <Route path="/" component={BurgerPage} />
              
            </Switch>
            ):(
              <Switch>
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <Redirect to="/login" />
              </Switch>
            )
          
          
          }

         
           
           
            
       
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.signupReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return{
    autoLogin: (token,userId) => dispatch(actions.loginUserSuccess(token,userId)),
    logout: () => dispatch(signupAction.logout()),
    autoLogoutAfterMillisec: () => dispatch(signupAction.autoLogoutAfterMillisec())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
