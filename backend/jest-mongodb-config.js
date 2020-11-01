module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'TestNodeCmsDB',
    },
    binary: {
      version: '4.4.1', // Version of MongoDB
      skipMD5: true,
    },
    autoStart: false,
  },
};
