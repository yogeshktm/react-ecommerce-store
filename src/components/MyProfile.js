import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

export default function MyProfile(props) {
  const classes = useStyles();
  let uname;
  let lname;
  let email;
  let phone;
  let flat_no;
  let street;
  let city;
  let zip_code;
  props.data.map(function (item) {
    uname = item.name.firstname;
    lname = item.name.lastname;
    email = item.email;
    phone = item.phone;
    flat_no = item.address.number;
    street = item.address.street;
    city = item.address.city;
    zip_code = item.address.zipcode;
    sessionStorage.setItem("userid", item.id);
  });
  sessionStorage.setItem("firstname", JSON.stringify(uname));

  return (
    <Container maxWidth="md">
      <div className="my-profile-wrapper">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <h3>
                Welcome, {uname} {lname}
              </h3>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <p>
                <label>
                  <strong>Email: </strong>
                </label>
                {email}
              </p>
              <p>
                <label>
                  <strong>Phone: </strong>
                </label>
                {phone}
              </p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <p>
                <label>
                  <strong>My address:</strong>
                </label>
              </p>
              <p>
                {flat_no},{street}
              </p>
              <p>{city}</p>
              <p>{zip_code}</p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
