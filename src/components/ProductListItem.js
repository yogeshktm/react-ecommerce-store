import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";

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

export default function ProductListItem(props) {
  const classes = useStyles();
  return props.data.map(function (item) {
    return (
      <Grid className="product-list-item" item xs={12} sm={3} key={item.id}>
        <Paper className={classes.paper}>
          <Link to={`/product-detail/${item.id}`}>
            <img className="product-img" src={item.image} alt={item.title} />
            <h3 className="product-list-title">
              <LinesEllipsis
                text={item.title}
                maxLine="3"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </h3>
          </Link>
          <p className="plp-price">Rs.{item.price}</p>
        </Paper>
      </Grid>
    );
  });
}
