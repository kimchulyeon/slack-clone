import React, { useCallback, useState } from 'react';
import useInput from '@hooks/useInput';
import { Header, Form, Label, Input, Button, LinkContainer, Error, Success } from '@pages/signup/styles';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  const [logInError, setLogInError] = useState(false);
  const [email, , onChangeEmail] = useInput('');
  const [password, , onChangePassword] = useInput('');

  // ==========================SWR=============================
  const { data, error, mutate } = useSWR('/api/users', fetcher);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      //====================POST LOGIN=========================
      axios
        .post(
          '/api/users/login',
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          console.log(res);
          mutate(); //================mutate====================
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [email, password],
  );

  // 로그인에 성공하면 워크스페이스 채널로 이동
  if (data) {
    return <Navigate to="/workspace/channel" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
