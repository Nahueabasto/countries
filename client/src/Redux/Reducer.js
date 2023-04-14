import { GET_COUNTRIES, GET_NAME_COUNTRY, FILTER_CONTINENT, FILTER_ACTIVIDADES, GET_ACTIVITIES, FILTER_BY_ORDER, FILTER_BY_SORT, DETAILS, POST_ACTIVITIES } from "./Actions";

const initialState = {
  countries: [],
  filtered: [],
  filteredCountries: [],
  activities: [],
  datails: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filtered: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_NAME_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      };

      case DETAILS:
        return {
          ...state,
          datails: action.payload,
        }
        case POST_ACTIVITIES:
        return {
          ...state,
        }

    case FILTER_CONTINENT:
      const allContinent = state.filtered;
      const continentFilter = action.payload === "All" ? allContinent : allContinent.filter(el => el.continent === action.payload)
      return{
        ...state,
        countries: continentFilter
      };
      
    case FILTER_ACTIVIDADES:
      const allCountries = state.filtered;
      const activityFilter = action.payload === "All" ? allCountries : allCountries.filter(country => {
        return country.activities.some(activity => activity.name.toLowerCase() === action.payload.toLowerCase());
      });
      return {
        ...state,
        countries: activityFilter
      };
    case FILTER_BY_ORDER:
      if (action.payload === "az") {
        return {
          ...state,
          countries: state.countries.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "za") {
        return {
          ...state,
          countries: state.countries.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          }),
        };
      }
      break; // Agregar break
    case FILTER_BY_SORT:
      if (action.payload === "asc") {
        return {
          ...state,
          countries: state.countries.sort(function (a, b) {
            if (a.population > b.population) {
              return -1;
            }
            if (b.population > a.population) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "des") {
        return {
          ...state,
          countries: state.countries.sort(function (a, b) {
            if (a.population > b.population) {
              return 1;
            }
            if (b.population > a.population) {
              return -1;
            }
            return 0;
          }),
        };
      }
      break; // Agregar break
    default:
      return state
    }}
      export default reducer;  


