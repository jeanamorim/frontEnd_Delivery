/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable radix */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import Dropzone from 'react-dropzone';

import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';

import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError } from 'react-icons/md';
import filesize from 'filesize';
import * as actions from '../../../../store/modules/uploads/actions';
import {
  Container,
  DropContainer,
  UploadMessage,
  Preview,
  Progress,
} from './style';
import api from '../../../../services/api';
//  * as actions from '../../store/modules/Upload/actions';

const Avatar = ({ uploadAvatarRequest }) => {
  const [uploaded, setUploaded] = useState({});
  const [preview, setPreview] = useState('');

  const handleUpload = files => {
    files.forEach(file => {
      const uploadFile = {
        file,
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      };

      setUploaded(uploadFile);
      setPreview(uploadFile.preview);
      processUpload(uploadFile);
    });
  };

  const processUpload = async uploadedFile => {
    const file = new FormData();

    file.append('file', uploadedFile.file);

    try {
      const { data } = await api.post('files', file, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          setUploaded({ ...uploadedFile, progress });
        },
      });

      setUploaded({ ...uploadedFile, uploaded: true });
      // return saveIdFile(data.id);   return uploadAvatarRequest(data);

      return uploadAvatarRequest(data);
    } catch (error) {
      setUploaded({ ...uploadedFile, error: true });
      return setPreview('');
    }
  };

  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste um arquivo aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo</UploadMessage>;
  };

  return (
    <Container>
      <Dropzone accept="image/*" onDropAccepted={handleUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
            // hasAvatar={!!preview}
          >
            {!!preview && <Preview src={preview} />}
            <input {...getInputProps()} />
            <center>
              {!preview && renderDragMessage(isDragActive, isDragReject)}
            </center>
          </DropContainer>
        )}
      </Dropzone>
      <Progress>
        <center>
          {!!uploaded.preview && !uploaded.error && !uploaded.uploaded && (
            <CircularProgressbar
              styles={{
                root: { width: 25 },
                path: { stroke: '#7159c1' },
              }}
              strokeWidth={20}
              value={uploaded.progress}
              text={`${uploaded.progress}%`}
            />
          )}
          {uploaded.uploaded && (
            <div>
              <span>Enviado com sucesso!</span>
              <MdCheckCircle size={24} color="#78e5d5" />
            </div>
          )}
          {uploaded.error && (
            <div>
              <span>
                Erro ao enviar, verifique o tamanho do arquivo ou sua internet!
              </span>
              <MdError size={24} color="#e57878" />
            </div>
          )}
        </center>
      </Progress>
    </Container>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ upload }) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
