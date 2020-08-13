import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./App.css";
import "./mediaqueries.css";
const axios = require("axios");

let initialData = [];

const evenYears = [2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020];
const oddYears = [2007, 2009, 2011, 2013, 2015, 2017, 2019];

// To fetch yearwise mission detais for successful launch and landing
const getYearWiseData = (year, callback, launch_value, landing_value) => {
  console.log("ENTER: getDataYearWise function " + year);
  if (launch_value == "" && landing_value == "") {
    let temp = initialData.filter((years, index) => {
      return year == initialData[index].launch_year;
    });
    callback(temp);
  } else {
    return axios
      .get(
        "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" +
          launch_value +
          "&land_success=" +
          landing_value +
          "&launch_year=" +
          year
      )
      .then(function (response) {
        console.log("SUCCESS: getYearWiseData: ");
        callback(response.data);
      })
      .catch((ex) => {
        console.log("ERROR: getYearWiseData: " + ex);
      });
  }
};

// Filter Component
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterAttribute: {
        selectedYear: "",
        successfulLaunchFlag: "",
        successfulLandingFlag: "",
      },
    };
  }

  getlaunchingorLandingData = (launch_value, landing_value, callback) => {
    console.log("ENTER : getlaunchingorLandingData ");
    let selectedYear = this.state.filterAttribute.selectedYear;
    axios
      .get(
        "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" +
          launch_value +
          "&land_success=" +
          landing_value
      )
      .then(function (response) {
        if (selectedYear != "") {
          let temp = response.data.filter((years, index) => {
            return selectedYear == response.data[index].launch_year;
          });
          callback(temp);
        } else {
          callback(response.data);
        }
      })
      .catch((ex) => {
        console.log("ERROR: getlaunchingorLandingData: " + ex);
      });
  };

  updateSelectedValue = (selectedValue, value) => {
    this.setState({
      filterAttribute: {
        ...this.state.filterAttribute,
        [selectedValue]: value,
      },
    });
  };

  render() {
    return (
      <Fragment>
        <h5>Filters</h5>
        <div className="container p-0">
          <p className="launch-year">Launch Year</p>
          <div className="row m-0">
            <div className="col-6 p-0">
              {evenYears.map((evenYear, index) => {
                return (
                  <div key={index} className={"text-center "}>
                    <button
                      className={
                        this.state.filterAttribute.selectedYear === evenYear
                          ? "selected "
                          : ""
                      }
                      onClick={() =>
                        getYearWiseData(
                          evenYear,
                          (data) => {
                            this.updateSelectedValue("selectedYear", evenYear);
                            this.props.updateMissionData(data);
                          },
                          this.state.filterAttribute.successfulLaunchFlag,
                          this.state.filterAttribute.successfulLandingFlag
                        )
                      }
                    >
                      {evenYear}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="col-6 p-0">
              {oddYears.map((oddYear, index) => {
                return (
                  <div key={index} className={"text-center "}>
                    <button
                      className={
                        this.state.filterAttribute.selectedYear === oddYear
                          ? "selected "
                          : ""
                      }
                      onClick={() =>
                        getYearWiseData(
                          oddYear,
                          (data) => {
                            this.updateSelectedValue("selectedYear", oddYear);
                            this.props.updateMissionData(data);
                          },
                          this.state.filterAttribute.successfulLaunchFlag,
                          this.state.filterAttribute.successfulLandingFlag
                        )
                      }
                    >
                      {oddYear}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="launch-year">Successful Launch</p>
          <div className="row">
            <div className="col-6 text-center">
              <button
                className={
                  this.state.filterAttribute.successfulLaunchFlag === "true"
                    ? "selected "
                    : ""
                }
                onClick={() => {
                  this.updateSelectedValue("successfulLaunchFlag", "true");
                  this.getlaunchingorLandingData(
                    "true",
                    this.state.filterAttribute.successfulLandingFlag,
                    (data) => {
                      this.props.updateMissionData(data);
                    }
                  );
                }}
              >
                True
              </button>
            </div>
            <div className="col-6 text-center">
              <button
                className={
                  this.state.filterAttribute.successfulLaunchFlag === "false"
                    ? "selected "
                    : ""
                }
                onClick={() => {
                  this.updateSelectedValue("successfulLaunchFlag", "false");
                  this.getlaunchingorLandingData(
                    "false",
                    this.state.filterAttribute.successfulLandingFlag,
                    (data) => {
                      this.props.updateMissionData(data);
                    }
                  );
                }}
              >
                False
              </button>
            </div>
          </div>
          <p className="launch-year ">Successful Landing</p>
          <div className="row mb-20">
            <div className="col-6 text-center">
              <button
                className={
                  this.state.filterAttribute.successfulLandingFlag === "true"
                    ? "selected "
                    : ""
                }
                onClick={() => {
                  this.updateSelectedValue("successfulLandingFlag", "true");
                  this.getlaunchingorLandingData(
                    this.state.filterAttribute.successfulLaunchFlag,
                    "true",
                    (data) => {
                      this.props.updateMissionData(data);
                    }
                  );
                }}
              >
                True
              </button>
            </div>
            <div className="col-6 text-center">
              <button
                className={
                  this.state.filterAttribute.successfulLandingFlag === "false"
                    ? "selected "
                    : ""
                }
                onClick={() => {
                  this.updateSelectedValue("successfulLandingFlag", "false");
                  this.getlaunchingorLandingData(
                    this.state.filterAttribute.successfulLaunchFlag,
                    "false",
                    (data) => {
                      this.props.updateMissionData(data);
                    }
                  );
                }}
              >
                False
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// Missions Component
class Missions extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.missionData.details != undefined ? (
      <div className="missions">
        <div class="image">
          <img src={this.props.missionData.links.mission_patch_small} />
        </div>

        <p className={"mission-name"}>
          {this.props.missionData.mission_name +
            " #" +
            this.props.missionData.flight_number}
        </p>
        <p>
          Mission ids:
          <span>
            {this.props.missionData.mission_id.length != 0
              ? this.props.missionData.mission_id.map((id, index) => {
                  return <li key={index}>{id}</li>;
                })
              : ""}
          </span>
        </p>
        <p>
          Launch Year: <span>{this.props.missionData.launch_year}</span>
        </p>
        <p>
          Successful Launch:
          <span>
            {this.props.missionData.launch_success ? " true" : " false"}
          </span>
        </p>
        <p>
          Successful Landing:
          <span>
            {String(
              this.props.missionData.rocket.first_stage.cores[0].land_success
            )}
          </span>
        </p>
      </div>
    ) : (
      ""
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missionData: this.props.missionDataValue,
    };
  }

  updateMissionData = (data) => {
    console.log("updateMissionData " + data);
    this.setState({
      ...this.state.missionData,
      missionData: data,
    });
  };

  componentWillMount() {
    console.log("component will mount");
  }

  componentDidMount() {
    console.log("component has mounted");
    initialData = this.props.missionDataValue;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.missionDataValue != this.props.missionDataValue) {
      initialData = this.props.missionDataValue;
      this.setState({
        ...this.state.missionData,
        missionData: this.props.missionDataValue,
      });
    }
  }
  render() {
    return (
      <div className="main-container">
        <div>
          <h4>SpaceX Launch Programs</h4>
        </div>
        <div className="data-container">
          <div className="filter-container">
            <Filter updateMissionData={this.updateMissionData} />
          </div>
          <div className="mission-container">
            <div className="row">
              {this.state.missionData.map((mission, index) => {
                return (
                  <Fragment key={index} className={""}>
                    <Missions
                      missionData={this.state.missionData[index]}
                      updateMissionData={this.updateMissionData}
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    missionDataValue: state.missionDataValue,
  };
};

export default connect(mapStateToProps)(App);
