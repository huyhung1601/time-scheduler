import {
  AccountTree,
  CastForEducation,
  SupervisorAccount,
  Work,
  NotListedLocation,
} from "@material-ui/icons";
import useStyles from "./styles";

interface IProps {
  logo: string;
  fontSize?: "small" | "inherit" | "default" | "large" | "medium" | undefined;
}
export const CustomLogo = (props: IProps) => {
  const classes = useStyles();
  const { logo, fontSize } = props;
  return (
    <div className={classes.root}>
      {logo === "none" && (
        <NotListedLocation fontSize={fontSize} color="primary" />
      )}
      {logo === "work" && <Work fontSize={fontSize} color="primary" />}
      {logo === "family" && (
        <SupervisorAccount fontSize={fontSize} color="primary" />
      )}
      {logo === "education" && (
        <CastForEducation fontSize={fontSize} color="primary" />
      )}
      {logo === "project" && (
        <AccountTree fontSize={fontSize} color="primary" />
      )}
    </div>
  );
};
