const initialState = {
  missionDataValue: [1, 2, 3, 4, 5, 6],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MISSION_DATA_SUCCESS":
      console.log("Entered " + action.payload.length);
      return {
        ...state,
        missionDataValue: action.payload,
        error: "",
      };
    case "FETCH_MISSION_DATA_ERROR": {
      return {
        ...state,
        error: action.payload,
        missionDataValue: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
