import React, { useEffect } from 'react';
import { Stack } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CircleIcon from '@mui/icons-material/Circle';
import { Typography } from '@mui/material';

const Images = (props) => {
  useEffect(() => {}, []);

  return (
    <Stack
      style={{
        maxHeight: 450,
        borderRadius: '10px',
      }}
      spacing={5}
    >
      <ImageList cols={5}>
        {(props.selected || []).map((url, idx) => (
          <ImageListItem key={idx + url.filename}>
            <img
              src={url.img}
              alt={url.filename}
              style={{ width: 200, height: 200 }}
            />
            <ImageListItemBar
              title={url.filename}
              actionIcon={
                <IconButton color={props.pastilles[idx]} aria-label={`star`}>
                  <CircleIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Stack direction="row" spacing={5}>
        <Stack direction="row">
          <CircleIcon color="success" />
          <Typography> : normal</Typography>
        </Stack>
        <Stack direction="row">
          <CircleIcon color="error" />
          <Typography> : pneumonia</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Images;
