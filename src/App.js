import React, { Component } from 'react';
import './App.css';


let     time = new Date().toLocaleString();

class App extends Component {
    intervalID;
    state = {
        vaccdata: [],
        thisVacc: []
    };


    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    getData = () => {
        time = new Date().toLocaleString();
        const url='https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json';
        fetch(url, {mode: 'cors'})
            .then(res => res.json())
            .then((data) => {
                //this.setState({ vaccdata: data.locations })
                //console.log(this.state.vaccdata)
                this.setState({ thisVacc: data.locations.filter(vacc => vacc.openTimeslots > 0).sort((a, b) => (a.city > b.city ? 1 : -1)) })

                this.intervalID = setTimeout(this.getData.bind(this), 1000);
            })
            .catch(console.log)
    }

  render() {
      return (
        <div className="container">
          <div className="col-xs-12">
            <h1>VACCEEENE HUNTER 2021</h1>{time}
              {this.state.thisVacc.length === 0 ? <h2>NONE RIGHT NOW</h2>:'good lucks'}
              {this.state.thisVacc.map((vacc) => (
                  <div className="card align-center" key={vacc.name}>
                      <div className="card-body">

                          <div className="text-bold"><b>{vacc.name}</b></div>
                          <div className="card-subtitle mb-2 text-bold"><b>{vacc.openTimeslots} -
                              {vacc.openAppointmentSlots}
                              <a href={vacc.url} target="vacc" rel="noreferrer"> {vacc.city } </a></b>
                              {vacc.city === 'AUSTIN' ? <h1 className="bigGreen">{vacc.city}</h1>:'' }
                              {vacc.city === 'Austin' ? <h1 className="bigGreen">{vacc.city}</h1>:'' }
                              {vacc.city === 'GEORGETOWN' ? <h1 className="bigRed">{vacc.city}</h1>:'' }
                              -- {vacc.street} {vacc.zip}
                              <hr/>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        </div>
    );

  }
}
export default App;
