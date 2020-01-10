import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: "40%",
    textAlign: "center",
    display: "inline-block",
    margin: "1%",
    marginLeft: "3%"
  },
  media: {
    height: 400,
  },
  header: {
      marginTop: "5%"
  }
});

export default function StylishGifCard({url, title}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <Typography className={classes.header} variant="body2" component="p">
            {title}
        </Typography>

        <CardContent>
            <CardMedia
            className={classes.media}
            image={url}
            />
        </CardContent>
    </Card>
  );
}