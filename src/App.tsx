import Grid from '@mui/material/Unstable_Grid2';
import SvgLoadButton from './components/SvgLoadButton';
import React, { useState } from 'react';


function App() {
  const [fileContent, setFileContent] = useState<string>('')

  function RenderSvg(props: { svg: string }) {
    return React.createElement('svg', {
      dangerouslySetInnerHTML: { __html: props.svg },
      className: 'max-w-full max-h-full'
    });
  }

  return (
    <div className='base-position'>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <SvgLoadButton
            setFileContent={setFileContent}>
            {fileContent ? 'Load SVG' : 'Add SVG'}
          </SvgLoadButton>
        </Grid>
        <Grid xs={8}>
          <div className='border border-base-gray h-md-500px flex items-center justify-center'>
            {!fileContent &&
              <div>Click "Add SVG" to put your svg here!</div>}
            {fileContent &&
              <RenderSvg svg={fileContent} />
            }
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
