## ๐  TIL

### 1. React18 ReactDOM.render() ์ง์์ํจ.

- https://velog.io/@seungmini/TypeScript%EC%97%90-React18-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0 ์ฐธ๊ณ 

---

### 2. ํซ๋ก๋ฉ

```
  // webpack.config.ts
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
    historyApiFallback: true,
  },

  //package.json
   "dev": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack serve --env development"
```

---

### 3. react-router@6์์ redirect์ํค๊ธฐ

- Navigate ์ฌ์ฉ

```
import {Routes, Route, Navigate} from 'react-router-dom'

<Routes>
  <Route path='/' element={<Navigate to='/login' replace />}>
</Routes>
```

๐ Navigateํ๊ทธ ์์ **replace** ํ๋กํผํฐ๋ฅผ ๋ฃ์ด์ฃผ๋ฉด navigate์ ์ ํ ์ฃผ์๋ก ๋์ด๊ฐ ํ ๋ค๋ก๊ฐ๊ธฐ๋ฅผ ํ๋๋ผ๋ ๋ฐฉ๊ธ์ ํ์ด์ง๋ก ๋์์ค์ง ์์ต๋๋ค. ์ด ๋๋ ์์ ์ ๋ฉ์ธ ํ์ด์ง ("/")๋ก ๋์์ค๊ฒ ๋๋ค.

### 4. ์ฝ๋ ์คํ๋ฆฟํ

```
  npm i @loadable/component

  const Login = loadable(() => import('@pages/login/Login'));
  const Signup = loadable(() => import('@pages/signup/Signup'));
```
