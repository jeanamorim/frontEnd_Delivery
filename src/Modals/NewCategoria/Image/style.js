import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #099409;
`;

const dragReject = css`
  border-color: #e57878;
`;

const hasAvatar = css`
  border-color: #715aa9;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 150px;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  display: flex;
  border: 4px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  max-width: 140px;
  min-height: 140px;
  width: auto;
  height: auto;
  overflow: hidden;

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive}
  ${props => props.isDragReject && dragReject}
  ${props => props.hasAvatar && hasAvatar}
`;

const messageColors = {
  default: '#999',
  error: '#e57878',
  success: '#099409',
};

export const UploadMessage = styled.div.attrs({
  className: 'upload',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 15px;
  padding: 5px;
  margin-top: 35px;
  color: ${props => messageColors[props.type || 'default']};
`;

export const Preview = styled.img`
  width: 100%;
`;

export const Progress = styled.div.attrs({
  className: 'progress',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 140px;
  max-height: 60px;
  width: 100%;
  height: 100%;
  margin-top: 5%;
  background: #fff;

  svg {
    display: block;
    justify-content: center;
    align-items: center;
  }
`;
