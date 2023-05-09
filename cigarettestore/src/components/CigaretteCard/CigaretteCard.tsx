import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Cigarette } from '../../models/cigarette';

export default function CigaretteCard() {
  return (
    <Card sx={{margin: 1}}>
      <CardContent>
        <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary" gutterBottom>
          Winston
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center'}}>
          Caster
        </Typography>
        <Typography variant="body2">
          <br />
          A fine tobacco cigarette.

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}