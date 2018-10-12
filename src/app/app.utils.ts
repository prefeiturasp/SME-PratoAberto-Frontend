export class AppUtils {

  static getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // this.deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  static deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  static getObjectById(data, key, id) {
    return data.find(x => x[key] === id);
  }

  static camelize(str) {
    const _str = str.toLowerCase().replace(/\s(.)/g, function($1) { return $1.toUpperCase(); });
    return _str.substring(0, 1).toUpperCase() + _str.substring(1, _str.length);
  }
}
