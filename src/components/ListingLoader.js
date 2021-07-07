import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function ProductListItemLoader(props) {
  const classes = useStyles();
  let dummyData = new Array(parseInt(props.items)).fill(0);
  console.log(dummyData);
  return (
    <>
      {dummyData.map(function (item, index) {
        return (
          <Grid
            className="product-list-item--loader"
            item
            xs={12}
            key={index}
            sm={3}
          >
            <Paper className={classes.paper}>
              <div className="product-img--loader"></div>
              <div className="plp-title--loader">
                <p></p>
                <p></p>
                <p></p>
              </div>
              <p className="plp-price--loader"></p>
            </Paper>
          </Grid>
        );
      })}
    </>
  );
}
