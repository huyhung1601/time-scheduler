import { TableCell, TableHead, TableRow } from "@material-ui/core";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import useStyles from "./styles";

const TimetableHeader = () => {
  const tday = new Date().getDay();
  /**MUI Styles */
  const classes = useStyles();
  const { tableCell, today } = classes;
  /**Redux */
  const { calendar } = useSelector((state: RootState) => state);
  /**days */
  const day = (index: number) => {
    let day;
    switch (index) {
      case 0:
        day = "Sun";
        break;
      case 1:
        day = "Mon";
        break;
      case 2:
        day = "Tue";
        break;
      case 3:
        day = "Wed";
        break;
      case 4:
        day = "Thu";
        break;
      case 5:
        day = "Fri";
        break;
      case 6:
        day = "Sat";
    }
    return day;
  };
  return (
    <>
      <TableHead>
        <TableRow>
          {calendar.dates.map((date: any, index: number) => {
            if (index < 7) {
              return (
                <TableCell
                  className={clsx(tableCell, { [today]: index === tday })}
                  key={index}
                >
                  <small>
                    {day(index)}
                    <br />
                    {calendar.type === "week" && date}
                  </small>
                </TableCell>
              );
            } else return null;
          })}
        </TableRow>
      </TableHead>
    </>
  );
};

export default TimetableHeader;
