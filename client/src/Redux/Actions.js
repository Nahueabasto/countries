import axios from 'axios';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_NAME_COUNTRY = 'GET_NAME_COUNTRY';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const FILTER_ACTIVIDADES = 'FILTER_ACTIVIDADES';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_BY_ORDER = 'FILTER_BY_ORDER';
export const FILTER_BY_SORT = 'FILTER_BY_SORT';
export const DETAILS = 'DETAILS';
export const POST_ACTIVITIES = 'POST_ACTIVITIES';

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get('/countries', {
        })
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

export function getNameCountry(payload){
    return async function (dispatch){
        var json = await axios.get(`/countries?name=${payload}`);
        return dispatch({
            type: GET_NAME_COUNTRY,
            payload: json.data,
        })
    }
}

export function filterContinent(payload) {
    return {
        type: FILTER_CONTINENT,
        payload,
    }
}

export function getActivities() {
    return async function (dispatch) {
      try {
        const response = await axios.get('/activities');
        const activities = response.data;
        dispatch({ type: GET_ACTIVITIES, payload: activities });
      } catch (error) {
        console.log(error);
      }
    };
  }


export function filterActividades(payload) {
    return {
        type: FILTER_ACTIVIDADES,
        payload,
    }
}

export function filterByOrder(payload){
    return {
        type: FILTER_BY_ORDER,
        payload,
    }
}

export function filterBySort(payload){
    return {
        type: FILTER_BY_SORT,
        payload,
    }
}
  
export function getDetail(id){
    return async function(dispatch) {
        try {
            const res = await axios.get(`/countries/${id}`);
            return dispatch({
                type: DETAILS,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};

export function postActivities(payload){
    return async function(dispatch){
        try{
        await axios.post('/activities', payload)
        return dispatch({
            type: POST_ACTIVITIES,
              });
         } catch (error) {
       alert("Post failed");
         }
     };
    }



