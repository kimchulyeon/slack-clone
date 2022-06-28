## 🛠 에러처리

1. React18 ReactDOM.render() 지원안함.

- https://velog.io/@seungmini/TypeScript%EC%97%90-React18-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0 참고

2. 핫로딩

```
  // webpack.config.ts
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
    // port: 3090,
    historyApiFallback: true,
  },

  //package.json
   "dev": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack serve --env development"
```
