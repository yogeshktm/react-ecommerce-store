
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import loaderImg from '../images/785.gif';

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
  return (
    <Container maxWidth="md">
      <div className="my-profile-wrapper">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <h3>
                Welcome, {props.isLoading ? <img src={loaderImg} /> : props.data.displayName ? props.data.displayName : "User"}
              </h3>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <form onSubmit={props.handleUpdate} className="updateProfile">
                <input type="text" placeholder="Your name" {...props.dName} required />
                <button>Update</button>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <h3>Change password</h3>
              <form onSubmit={props.handlePwdUpdate} className="updateProfile">
                <input type="password" placeholder="New Password" {...props.newPwd} required />
                <input type="password" onChange={props.checkPwd} placeholder="Confirm new Password" {...props.confirmNewPwd} required />
                <button>Update</button>
                {props.pwdMatch ? <p className="success">Password Match</p> : <p className="error">Passwords not match</p>}
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <figure className="profile-pic">
                <img src={props.data.photoURL} />
              </figure>
              <p>
              </p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <p>
                <label>
                  <strong>Email: {props.data.email}&nbsp;{props.data.emailVerified ? <span className="email-vertified success">Verified</span> : <span className="email-not-verified error">&nbsp;Email not vertified</span>}{props.data.emailVerified ? null : <a onClick={props.emailVertify} href="#">vertify</a>}</strong>
                </label>
              </p>
              <p>
              </p>
            </Paper>
          </Grid>

        </Grid>
      </div>
    </Container >
  );
}
