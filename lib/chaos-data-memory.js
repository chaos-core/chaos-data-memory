const Rx = require('rx');

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
   * @return {Rx.Observable}
   */
  getData(type, id, keyword) {
    let key = ChaosDataMemory._getKey(type, id, keyword);
    let data = this.data[key];

    return Rx.Observable
      .if(
        () => typeof data === 'undefined',
        Rx.Observable.of('{}'),
        Rx.Observable.of(data),
      )
      .map((json) => JSON.parse(json)['data']);
  }

  /**
   *
   * @param type
   * @param id
   * @param keyword
   * @param data
   *
   * @return {Rx.Observable}
   */
  setData(type, id, keyword, data) {
    let key = ChaosDataMemory._getKey(type, id, keyword);
    this.data[key] = JSON.stringify({data});

    return this.getData(type, id, keyword);
  }
}

module.exports = ChaosDataMemory;
