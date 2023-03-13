import React from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        align: 'center',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#FFFFFF',
        borderStyle: 'dashed',
        backgroundColor: '#740d10',
        width: 300,
        height: 100,
      }}
    >
      <Stack alignItems="center">
        <CloudUploadIcon style={{ width: 50, height: 50, color: 'white' }} />
        <input {...getInputProps()} />
        <Typography color="white">Upload your image(s)</Typography>
      </Stack>
    </div>
  );
};

export default Dropzone;
