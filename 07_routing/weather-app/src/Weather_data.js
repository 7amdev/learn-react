const data = [
    { city: 'Amsterdam',    temp: 299.15 },
    { city: 'Berlin',       temp: 295.22 },
    { city: 'Delhi',        temp: 307.54 },
    { city: 'Johannesburg', temp: 288.89 },
    { city: 'Londom',       temp: 294.12 },
    { city: 'New York',     temp: 301.81 },
];

export const weather_data = function (scale) {
    switch (scale) {
        case 'celsius':
            return data.map(function (item) {
                return {
                    ...item, 
                    temp: (item.temp - 273.15).toFixed(2)
                };
            });
        case 'fahrenheit':
            return data.map(function (item) {
                return {
                    ...item, 
                    temp: ((item.temp - 273.15) * 1.8 + 32).toFixed(2)
                };
            });
        case 'kelvin':
        default:
            return data;
    }
}