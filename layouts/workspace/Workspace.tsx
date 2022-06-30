import fetcher from '@utils/fetcher';
import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Navigate } from 'react-router';
import { Header, ProfileImg, RightMenu } from '@layouts/workspace/styles';

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { data, error, mutate } = useSWR('/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios.post('/api/users/logout').then(() => {
      mutate(); //================mutate====================
    });
  }, []);

  if (data === undefined) {
    return <div>Loading</div>;
  }

  if (data === false) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src="" alt={data.nickname} />
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </>
  );
};

export default Workspace;
