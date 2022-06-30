## 🛠 TIL

### 1. React18 ReactDOM.render() 지원안함.

- https://velog.io/@seungmini/TypeScript%EC%97%90-React18-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0 참고

---

### 2. 핫로딩

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

### 3. react-router@6에서 redirect시키기

- Navigate 사용

```
import {Routes, Route, Navigate} from 'react-router-dom'

<Routes>
  <Route path='/' element={<Navigate to='/login' replace />}>
</Routes>
```

📄 Navigate태그 안에 **replace** 프로퍼티를 넣어주면 navigate에 적힌 주소로 넘어간 후 뒤로가기를 하더라도 방금의 페이지로 돌아오지 않습니다. 이 때는 자신의 메인 페이지 ("/")로 돌아오게 된다.

### 4. 코드 스플릿팅

```
  npm i @loadable/component

  const Login = loadable(() => import('@pages/login/Login'));
  const Signup = loadable(() => import('@pages/signup/Signup'));
```
