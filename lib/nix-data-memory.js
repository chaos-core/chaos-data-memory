const Rx = require('rx');

class NixDataMemory {
  /**
   *
   * @param nix
   * @param config
   */
  constructor(nix, config) {
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
    let key = NixDataMemory._getKey(type, id, keyword);
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
    let key = NixDataMemory._getKey(type, id, keyword);
    this.data[key] = JSON.stringify({data});

    return this.getData(type, id, keyword);
  }
}

module.exports = NixDataMemory;
