import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Cigarette } from '../../models/cigarette';

export default function CigaretteCard({cigarette}: {cigarette: Cigarette}) {
  return (
    <Card sx={{margin: 1}}>
      <CardContent>
        <Typography sx={{ fontSize: 15, textAlign: 'center' }} color="text.secondary" gutterBottom>
          {cigarette.brand?.name}
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center'}}>
          {cigarette.model}
        </Typography>
        <Typography variant="body2">
          <br />
          Type: {cigarette.type}
          <br />
          Nicotine: {cigarette.nicotineQuantity} mg
          <br />
          Requires heating: {cigarette.heated ? 'Yes' : 'No'}
          <br />
          Price: {cigarette.price} RON
          <br />
          Ordered {cigarette.numberOfOrders} times 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}