import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Brand } from '../../models/brand';

export default function BrandCard({brand}: {brand: Brand}) {
  return (
    <Card sx={{margin: 1}}>
      <CardContent>
        <Typography sx={{ fontSize: 15, textAlign: 'center' }} color="text.secondary" gutterBottom>
          {brand.name}
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center'}}>
          {brand.year}
        </Typography>
        <Typography variant="body2">
          <br />
          {brand.description}
          <br />
          Country: {brand.country}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}