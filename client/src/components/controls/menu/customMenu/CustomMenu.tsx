import { useState } from "react";
import useClickOutside from "../../../../hooks/useClickOutside";
import MenuLogo from "../menuLogo/MenuLogo";
import useStyles from "./styles";

interface IProps {
  label: string;
  selectList: any[];
  showTitle: Boolean;
  selected?: any;
  setSelected?: any;
  addOption?: any;
}
export const CustomMenu = ({
  label,
  selectList,
  showTitle,
  selected,
  setSelected,
  addOption,
}: IProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleSelect = (item: any) => {
    setSelected(item);
    setOpen(false);
  };

  const domNode = useClickOutside(() => {
    setOpen(false);
  });
  return (
    <div ref={domNode} className={classes.root}>
      <div className="selectHeader">
        <small>{label}</small>
        {addOption && (
          <button className="addBtn" onClick={addOption}>
            +
          </button>
        )}
      </div>
      {selected && (
        <>
          <div className="selectedItem" onClick={() => setOpen(true)}>
            <MenuLogo logo={selected.logo} />{" "}
            {showTitle && <p>{selected.title}</p>}{" "}
          </div>
          {open && (
            <div className="selectListWrapper">
              <ul className="selectList">
                {selectList.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleSelect(item)}
                      className="selectItems"
                    >
                      <MenuLogo logo={item.logo} />
                      <p>{item.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};
