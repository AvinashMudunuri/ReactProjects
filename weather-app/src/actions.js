import fetch from 'isomorphic-fetch';
export function changeLocation(location) {
	return {
		type: 'CHANGE_LOCATION',
		location: location
	};
}

export function setSelectedDate(date) {
  return {
    type: 'SET_SELECTED_DATE',
    date: date
  };
}

export function setSelectedTemp(temp) {
  return {
    type: 'SET_SELECTED_TEMP',
    temp: temp
  };
}

export function setData(data) {
  return {
    type: 'SET_DATA',
    data: data
  };
};

export function setCity(city) {
  return {
    type: 'SET_CITY',
    city: city
  };
};

export function setDates(dates) {
  return {
    type: 'SET_DATES',
    dates: dates
  };
};

export function setTemps(temps) {
  return {
    type: 'SET_TEMPS',
    temps: temps
  };
};

export function fetchData(url) {
    return function thunk(dispatch) {
        fetch(url)
        .then(function(response){
            if(response.status === 200) {
            return response;
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var list = data.list;
            var dates = [];
            var temps = [];
            for (var i = 0; i < list.length; i++) {
                dates.push(list[i].dt_txt);
                temps.push(list[i].main.temp);
            }

            dispatch(setData(data));
            dispatch(setCity(data.city.name));
            dispatch(setDates(dates));
            dispatch(setTemps(temps));
            dispatch(setSelectedDate(''));
            dispatch(setSelectedTemp(null));
        })
        .catch(function(err){
            throw new Error('Error Message:', err);
        });
    }
}