import Grid from '@mui/material/Unstable_Grid2';
import SvgLoadButton from './components/SvgLoadButton';

function App() {
  return (
    <div className='bg-indigo-500'>
      test
      <Grid container spacing={2}>
        <Grid xs={12}>
          <SvgLoadButton>Load SVG</SvgLoadButton>
        </Grid>
        <Grid xs={8}>
          <div>test</div>
        </Grid>
        <Grid xs={4}>
          <div>test</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
