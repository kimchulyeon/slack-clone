import React, { CSSProperties, FC, ReactNode, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from '@components/menu/styles';

interface Props {
  children: ReactNode;
  show: boolean;
  onCloseMenu: () => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({ children, style, show, onCloseMenu }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    // 모달 제외한 배경 부분
    <CreateMenu>
      {/* 모달 메뉴 */}
      <div onClick={stopPropagation} style={style}>
        {show && <CloseModalButton onClick={onCloseMenu}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
