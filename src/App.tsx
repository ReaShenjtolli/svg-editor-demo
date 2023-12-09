import Grid from '@mui/material/Unstable_Grid2';
import SvgLoadButton from './components/SvgLoadButton';
import TreeView from './components/TreeView';
import React, { useState } from 'react';

function App() {
  const [fileContent, setFileContent] = useState<string>('')

  function RenderSvg(props: { svg: string }) {
    return React.createElement('div', {
      dangerouslySetInnerHTML: { __html: props.svg },
      style: { width: '500px', height: '500px', justifyContent: 'center' }
    });
  }

  // Create a new DOMParser
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(fileContent, 'image/svg+xml');
  const svgNode = svgDoc.documentElement;

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
              <div>Click "Add SVG" to put your svg here!</div>
            }
            {fileContent &&
              <RenderSvg svg={fileContent} />
            }
          </div>
        </Grid>
        <Grid xs={4}>
        <TreeView data={svgNode} />
        </Grid>
       
      </Grid>
    </div>
  );
}

export default App;
