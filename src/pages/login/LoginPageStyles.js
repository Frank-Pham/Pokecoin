import { createStyles, makeStyles } from "@material-ui/core";
import Colors from "../../themes/Colors";

const useStyles = makeStyles({
  content: {
    maxWidth: 500,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: "52px 0px 20px 0px",
  },
  textFieldContainer: {
    padding: 8,
  },
  textField: {
    width: 400,
    backgroundColor: "white",
    borderRadius: 4,
  },
  buttonContainer: {
    maxWidth: 400,
  },
  loginButtonContainer: {
    paddingTop: 24,
  },
  loginButton: {
    width: 400,
  },
  registerContainer: {
    paddingTop: 20,
  },
  link: { color: "white", fontSize: 12 },
});

export default useStyles;
