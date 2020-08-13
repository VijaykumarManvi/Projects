const axios = require("axios");

export const fetchMissionDataSuccess = (missionDataValue) => {
  console.log("fetchMissionDataSuccess");
  return {
    type: "FETCH_MISSION_DATA_SUCCESS",
    payload: missionDataValue,
  };
};

export const fetchMissionDataError = (error) => {
  return {
    type: "FETCH_MISSION_DATA_ERROR",
    payload: error,
  };
};

export const fetchMissionsData = () => {
  console.log("fetchMissionsData");
  return function (dispatch) {
    return axios
      .get("https://api.spaceXdata.com/v3/launches?limit=100")
      .then((response) => {
        const missionData = response.data;
        dispatch(fetchMissionDataSuccess(missionData));
      })
      .catch((error) => {
        dispatch(fetchMissionDataError(error.message));
      });
  };
};
