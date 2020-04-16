const ChaosCore = require('chaos-core');

const config = require('../config.js');

let chaos = new ChaosCore({
  dataSource: {
    type: 'memory',
  },
  ...config,
});

chaos.listen();
