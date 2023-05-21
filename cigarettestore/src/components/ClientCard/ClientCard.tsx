import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Client } from "../../models/client";

export default function ClientCard({ client }: { client: Client }) {

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 15, textAlign: "center" }}
          color="text.secondary"
          gutterBottom
        >
          {client.secondName}
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          {client.firstName}
        </Typography>
        <Typography variant="body2">
          <br />
          E-mail: {client.email}
          <br />
          Birthday: {client.dateOfBirth}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
