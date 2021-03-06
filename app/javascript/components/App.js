/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import configureStore from '../redux/configureStore';
import { getDoctors } from '../redux/actions/doctors';
import Landing from './Landing';
import Search from './Search';
import Appointments from './Appointments';
import Doctor from './Doctor';
import BookAppointment from './BookAppointment';
import LoginChecker from './LoginChecker';
import DashBoard from './admin/DashBoard';
import DoctorForm from './admin/DoctorForm';

const store = configureStore();
store.dispatch(getDoctors());

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <StylesProvider injectFirst>
            <Switch>
              <Route exact path="/" render={() => <Landing />} />
              <Route exact path="/admin" render={() => <DashBoard />} />
              <Route exact path="/admin/new" render={routerObj => <DoctorForm match={routerObj.match} />} />
              <Route
                path="/admin/update/:id"
                render={routerObj => (
                  <DoctorForm
                    match={routerObj.match}
                    doctors={store.getState().doctors}
                  />
                )}
              />
              <LoginChecker>
                <Route exact path="/search" render={() => <Search />} />
                <Route exact path="/appointments" render={() => <Appointments />} />
                <Route
                  exact
                  path="/doctors/:id/book_appointment"
                  render={routerObj => (
                    <BookAppointment
                      doctor={
                        store.getState().doctors.find(doctor => (
                          doctor.id === Number(routerObj.match.params.id)
                        ))
                      }
                    />
                  )}
                />
                <Route
                  exact
                  path="/doctors/:id"
                  render={routerObj => (
                    <Doctor
                      doctor={
                        store.getState().doctors.find(doctor => (
                          doctor.id === Number(routerObj.match.params.id)
                        ))
                      }
                    />
                  )}
                />
              </LoginChecker>
            </Switch>
          </StylesProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
