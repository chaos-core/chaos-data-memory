const { of } = require('rxjs');
const { map } = require('rxjs/operators');

class ChaosDataMemory {
  /**
   *
   * @param chaos {ChaosCore}
   * @param config
   */
  constructor(chaos, config) {
    this.type = "Memory";
    this.data = {};
  }

  static _getKey(type, id, keyword) {
    return [type, id, keyword].join(':');
  }

  /**
   *
   * @param type
   * @param id
   * @param keyword
   *
   * @return {Observable}
   */
  getData(type, id, keyword) {
    const key = ChaosDataMemory._getKey(type, id, keyword);
    const data = this.data[key];
    let data$;

    if (typeof data === 'undefined') {
      data$ = of('{}')
    } else {
      data$ = of(data)
    }

    return data$.pipe(
      map((json) => JSON.parse(json)['data']),
    )
  }

  /**
   *
   * @param type
   * @param id
   * @param keyword
   * @param data
   *
   * @return {Observable}
   */
  setData(type, id, keyword, data) {
    let key = ChaosDataMemory._getKey(type, id, keyword);
    this.data[key] = JSON.stringify({data});

    return this.getData(type, id, keyword);
  }
}

module.exports = ChaosDataMemory;
