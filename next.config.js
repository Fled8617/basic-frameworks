const withPlugins = require("next-compose-plugins");
const withLess = require("@zeit/next-less");
// const fs = require("fs");
// const path = require("path");
// const isDev = process.env.NODE_ENV !== "production";
if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}
module.exports = withPlugins(
  [
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true
          // modifyVars: themeVariables, // make your antd custom effective
        }
      }
    ]
  ],
  {
    webpack(config, options) {
      if (options.isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals)
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: "null-loader"
        });
      }
      // if (options.isServer) {
      //   const antStyles = /antd-mobile\/.*?\/style.*?/;
      //   const origExternals = [...config.externals];
      //   config.externals = [
      //     (context, request, callback) => {
      //       if (request.match(antStyles)) return callback();
      //       if (typeof origExternals[0] === "function") {
      //         origExternals[0](context, request, callback);
      //       } else {
      //         callback();
      //       }
      //     },
      //     ...(typeof origExternals[0] === "function" ? [] : origExternals)
      //   ];
      //
      //   config.module.rules.unshift({
      //     test: antStyles,
      //     use: "null-loader"
      //   });
      // }

      return config;
    }
  }
);
