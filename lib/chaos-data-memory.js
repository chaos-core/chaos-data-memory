class ChaosDataMemory {
  type = "Memory";
  data = {};

  static _getKey(type, id, keyword) {
    return [type, id, keyword].join(':');
  }

  /**
   *
   * @param type
   * @param id
   * @param keyword
   *
   * @return {Promise<any>}
   */
  async getData(type, id, keyword) {
    const key = ChaosDataMemory._getKey(type, id, keyword);
    let data = this.data[key];

    if (typeof data === 'undefined') {
      data = '{}'
    }

    return JSON.parse(data)['data'];
  }

  /**
   *
   * @param type
   * @param id
   * @param keyword
   * @param data
   *
   * @return {Promise<any>}
   */
  async setData(type, id, keyword, data) {
    let key = ChaosDataMemory._getKey(type, id, keyword);
    this.data[key] = JSON.stringify({data});
    return this.getData(type, id, keyword);
  }
}

module.exports = ChaosDataMemory;
