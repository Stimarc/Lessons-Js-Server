export class WeatherModel {

    constructor(data) {
        this._name = data.location.name;
        this._region = data.location.region;
        this._country = data.location.country;
        this._localtime = data.location.localtime;
        this._temp_c = data.current.temp_c;
        this._text = data.current.condition.text;
        this._icon = `https:${data.current.condition.icon}`;
        this._wind_kph = data.current.wind_kph;
        this._wind_dir = data.current.wind_dir;
        this._vis_km = data.current.vis_km;
    }

    get name() {
        return this._name;
    }

    get region() {
        return this._region;
    }

    get country() {
        return this._country;
    }

    get localtime() {
        return this._localtime;
    }

    get temp_c() {
        return this._temp_c;
    }

    get text() {
        return this._text;
    }

    get icon() {
        return this._icon;
    }

    get wind_kph() {
        return this._wind_kph;
    }

    get wind_dir() {
        return this._wind_dir;
    }

    get vis_km() {
        return this._vis_km;
    }

}