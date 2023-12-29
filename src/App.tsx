import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import SvgLoadButton from './components/SvgLoadButton';
import TreeView from './components/TreeView';
import Loader from './components/Loader';
import { addEventsInSvg } from './lib/localStorageEvents';

function App() {

  const [fileContent, setFileContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedSvg = localStorage.getItem('loadedSvg');
    if (savedSvg) {
      setFileContent(savedSvg);
    }
    addEventsInSvg()
    setIsLoading(false);
  }, [fileContent]);

  function RenderSvg(props: { svg: string }) {
    return React.createElement('div', {
      dangerouslySetInnerHTML: { __html: props.svg },
      style: { width: '600px' }
    });
  }

  const handleRemove = () => {
    localStorage.removeItem('loadedSvg');
    localStorage.removeItem('svgEvents');
    setFileContent('');
  }

  if (isLoading) {
    return (
      <Loader />
    )
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
          <div className='border rounded border-base-gray h-md-500px flex items-center justify-center'>
            {!fileContent &&
              <div>Click "Add SVG" to put your svg here!</div>
            }
            {fileContent &&
              <RenderSvg svg={fileContent} />
            }
          </div>
        </Grid>
        <Grid xs={4}>
          {fileContent ?
            <TreeView
              fileContent={fileContent}
            /> :
            <p>Add SVG to load tree data file...</p>
          }
        </Grid>
        {fileContent &&
          <Button
            variant="outlined"
            color="error"
            onClick={handleRemove}
          >
            Remove Svg
          </Button>
        }
      </Grid>
    </div>
  );
}

export default App;
