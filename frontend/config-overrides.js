module.exports = function override(config) {
  if (!config.devServer) config.devServer = {};

  // 💥 FINAL FIX FOR YOUR ERROR
  config.devServer.allowedHosts = "all";
  config.devServer.host = "localhost";

  return config;
};
