import React, { useCallback, useState } from 'react';
import { Header, Form, Label, Input, Button, LinkContainer, Error, Success } from '@pages/signup/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const Signup = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher);

  const [email, setEmail, onChangeEmail] = useInput('');
  const [nickname, setNickname, onChangeNickname] = useInput('');
  const [password, setPassword, ,] = useInput('');
  const [passwordCheck, setPasswordCheck, ,] = useInput('');

  const [mismatchError, setMismatchError] = useState(false);
  const [signupError, setSignupError] = useState('');

  const navigate = useNavigate();

  //======================function============================
  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      setSignupError('');
      //====================POST SIGNUP=========================
      axios
        .post('/api/users', {
          email,
          nickname,
          password,
        })
        .then((res) => {
          navigate('/login');
        })
        .catch((err) => {
          setSignupError(err.response.data);
        });
    },
    [email, nickname, password, passwordCheck],
  );

  const onChangePassword = useCallback(
    (e: any) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: any) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  if (data === undefined) {
    return <div>Loading</div>;
  }

  if (data) {
    return <Navigate to="/workspace/slack/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Slack</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {(!nickname || !email || !password || !passwordCheck) && <Error>빈칸을 입력해주세요.</Error>}
          {signupError && <Error>{signupError}</Error>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Signup;
