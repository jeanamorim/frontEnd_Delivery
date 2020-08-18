/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';

import api from '../../../services/api';
import { Container } from './styles';

export default function AvatarInput({ urlImage }) {
  const ref = useRef();

  const { defaultValue, registerField } = useField('image');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'image_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); // eslint-disable-line

  async function handleChange(e) {
    setLoading(true);
    const data = new FormData();

    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
    setLoading(false);
  }

  return (
    <Container>
      <label htmlFor="image">
        {loading ? (
          <img src="https://lunita.com.br/assets/img/carregando2.gif" alt="" />
        ) : (
          <img src={preview || urlImage} alt="" />
        )}

        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
