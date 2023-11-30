import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import SvgLoadButton from './components/SvgLoadButton';
import { useState } from 'react';

function App() {
  const [haveSVG, setHaveSVG] = useState(true)

  return (
    <div className='base-position'>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <SvgLoadButton>{haveSVG ? 'Load SVG' : 'Add SVG'}</SvgLoadButton>
        </Grid>
        <Grid xs={8}>
          <div className='border border-base-gray h-md-500px flex items-center justify-center'>
            <img className='max-w-full max-h-full' src='/developer.svg' />
          </div>
        </Grid>
        <Grid xs={4}>
          <div className='border border-base-gray h-md-500px'>
            test
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
