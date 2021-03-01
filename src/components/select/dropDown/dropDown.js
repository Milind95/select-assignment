import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
      maxWidth: 250,
    },
    selectRoot: {
      border: "1px solid",
      padding: "10px"
    },
    selectLabelRoot: {
      padding: "0px 10px"
    },
    menuItemRoot: {
      padding: 0,
      border: "1px solid #cecbcb;"
    },
    headerMenuItemRoot: {
      padding: 0,
    },
    actionSection: {
      height: "60px",
      width: '100%',
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    menuList: {
      height: "200px",
      overflowY: "auto"
    },
    submitBtn: {
      color: "limegreen"
    },
    searchBoxRoot: {
      width: "90%"
    }
  }),
);

const DropDown = (props) => {
  const { label, labelId, id, selectedOption, options, onChange, isMultiSelect, isSearchable } = props;
  const [formattedOptions, setFormattedOptions] = useState(options);
  const [optionsCopy, setOptionsCopy] = useState(options);
  const [isHeaderCheckboxChecked, setHeaderCheckboxChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const formattedOptions = options.map((option, index) => {
      if (typeof option === 'string') {
        return {
          name: option,
          value: option
        }
      } else if (typeof option === 'object') {
        return {
          name: option.name,
          value: option.name,
          isChecked: option.isChecked
        }
      }
    });
    setFormattedOptions(formattedOptions);
    setOptionsCopy([...formattedOptions]);
    setHeaderCheckboxChecked(formattedOptions.every(option => option.isChecked));
  }, [options])

  const handleChange = (event) => {
    onChange(event.target.value, [...optionsCopy]);
  };

  const toggleAllCheckbox = (isChecked) => {
    const options = [...formattedOptions];
    const optionsCopyTemp = [...optionsCopy];
    const resetedOptions = options.map(option => {
      return {
        ...option,
        isChecked: isChecked
      }
    });
    optionsCopyTemp.forEach(option => {
      resetedOptions.forEach(ops => {
        if (option.name === ops.name) {
          option.isChecked = ops.isChecked;
        }
      });
    });
    setFormattedOptions(resetedOptions);
    setOptionsCopy([...optionsCopyTemp]);
  };

  const onMultiSelectSubmit = () => {
    const selectedOptions = [...formattedOptions].filter(option => option.isChecked);
    const allOptions = [...optionsCopy];
    onChange(selectedOptions, allOptions);
    handleClose();
  };

  const onCheckboxChange = (option) => {
    const options = [...formattedOptions];
    const optionsCopyTemp = [...optionsCopy];
    const index = options.findIndex(each => each.name === option.name);
    const indexForCopy = optionsCopyTemp.findIndex(each => each.name === option.name);
    if (index > -1) {
      options[index] = {
        ...option,
        isChecked: !option.isChecked
      };
      optionsCopyTemp[indexForCopy] = {
        ...option,
        isChecked: !option.isChecked
      };
      setFormattedOptions(options);
      setOptionsCopy(optionsCopyTemp);
      setHeaderCheckboxChecked(options.every(option => option.isChecked));
    }
  }

  const onHeaderCheckboxChange = () => {
    toggleAllCheckbox(!isHeaderCheckboxChecked);
    setHeaderCheckboxChecked(!isHeaderCheckboxChecked);
  }

  const onClear = () => {
    toggleAllCheckbox(false);
    setHeaderCheckboxChecked(false);
  }

  const onSearchChange = (e) => {
    const filteredOptions = optionsCopy.filter(option => option.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFormattedOptions(filteredOptions);
    setHeaderCheckboxChecked(filteredOptions.every(option => option.isChecked));
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={labelId} classes={{ root: classes.selectLabelRoot }}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        multiple={isMultiSelect}
        value={selectedOption}
        open={open}
        classes={{
          root: classes.selectRoot
        }}
        renderValue={(selected) => isMultiSelect ? `${label} - ${selected.length > 0 && selected.map(each => each.name).join(', ')}` : `${label} - ${selected}`}
        onChange={!isMultiSelect ? handleChange : null}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        {(isMultiSelect || isSearchable) && (
          <span>
            <MenuItem key={'checkBox-Toggle'} classes={{ root: classes.headerMenuItemRoot }}>
              {isMultiSelect && (<Checkbox color="default" checked={isHeaderCheckboxChecked} onChange={onHeaderCheckboxChange} />)}
              <div onClick={(e) => {
                handleOpen();
                e.stopPropagation();
              }}>
                {isSearchable && <TextField
                  id="outlined-full-width"
                  style={{ margin: 8 }}
                  placeholder="Search"
                  className={classes.searchBoxRoot}
                  onChange={onSearchChange}
                />
                }
              </div>

            </MenuItem>
          </span>
        )}

        {isMultiSelect ? (<span>
          <div className={classes.menuList}>
            {formattedOptions.map(option => <MenuItem key={option.value} value={option.value} classes={{ root: classes.menuItemRoot }} onClick={() => onCheckboxChange(option)}>
              <Checkbox color="default" checked={option.isChecked} />
              <ListItemText primary={option.name} />
            </MenuItem>)}
          </div>
          <div className={classes.actionSection}>
            <Button color="default" onClick={onClear}>Clear</Button>
            <Button className={classes.submitBtn} onClick={onMultiSelectSubmit}>Submit</Button>
          </div>
        </span>)
          : formattedOptions.map(option => <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>)
        }
      </Select>
    </FormControl>
  );
};

export default DropDown;