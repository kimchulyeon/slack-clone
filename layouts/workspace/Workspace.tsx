import fetcher from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import { Navigate, Outlet } from 'react-router';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/workspace/styles';
import loadable from '@loadable/component';
import { Link } from 'react-router-dom';
import { IUser } from 'types/db';
import { Button, Input, Label } from '@pages/signup/styles';
import useInput from '@hooks/useInput';
import Modal from '@components/modal/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = loadable(() => import('@components/menu/Menu'));

const Workspace = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [newWorkspace, setNewWorkspace, onChangeNewWorkspace] = useInput('');
  const [newUrl, setNewUrl, onChangeNewUrl] = useInput('');

  const { data: userData, error, mutate } = useSWR<IUser | false>('/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios.post('/api/users/logout').then(() => {
      mutate(); //================mutate====================
    });
  }, []);

  // 프로필 메뉴 토글 함수
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => {
      return !prev;
    });
  }, []);

  // 워크스페이스 모달 토글 함수
  const onClickCreateWorkspace = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  //================================o워크스페이스 생성 함수o================================\\
  const onCreateWorkspace = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim() || !newUrl || !newUrl.trim()) return;

      axios
        .post(
          '/api/workspaces',
          {
            workspace: newWorkspace,
            url: newUrl,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          mutate();
          setShowWorkspaceModal(false);
          setNewWorkspace('');
          setNewUrl('');
        })
        .catch((err) => {
          setNewWorkspace('');
          setNewUrl('');
          toast.error(err.message, {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    },
    [newWorkspace, newUrl],
  );

  const onCloseModal = useCallback(() => {
    setShowWorkspaceModal(false);
  }, []);

  // :::::::::::라우트 이동 시 다른 화면 잠깐 보이는걸 로딩 처리:::::::::::
  if (userData === undefined) {
    return <div>Loading</div>;
  }

  // ::::::::::::::::userData가 없을 때 로그인 페이지로 이동:::::::::::::::::
  if (userData === false) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {/* ============================HEADER============================ */}
      <Header>
        <RightMenu>
          {/* :::::::::::::프로필 이미지 | 클릭 : 모달 메뉴 토글::::::::::::: */}
          <div onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.nickname} />
            {/* ::::::::::::::::::프로필 모달창:::::::::::::::::: */}
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseMenu={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.email, { s: '36px', d: 'retro' })} alt={userData.email} />
                  <div>
                    <span id="profile-name">{userData.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </div>
        </RightMenu>
      </Header>
      {/* =============================BODY============================= */}
      <WorkspaceWrapper>
        {/* :::::::::::::워크스페이스 사이드바::::::::::::: */}
        <Workspaces>
          {userData?.Workspaces.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.id}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>;
        </Workspaces>

        {/* :::::::::::::채널 사이드바::::::::::::: */}
        <Channels>
          <WorkspaceName>slack</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>
          {/* :::::::::::::::OUTLET:::::::::::::::: */}
          <Outlet />
        </Chats>
      </WorkspaceWrapper>

      {/* =============================워크스페이스 생성 모달창============================= */}
      <div onClick={onCloseModal}>
        <Modal show={showWorkspaceModal} onCloseModal={onCloseModal}>
          <form onSubmit={onCreateWorkspace}>
            <Label id="workspace-label">
              <span>워크스페이스 이름</span>
              <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
            </Label>
            <Label id="workspace-url-label">
              <span>워크스페이스 url</span>
              <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
            </Label>
            <Button type="submit">생성하기</Button>
          </form>
        </Modal>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Workspace;
