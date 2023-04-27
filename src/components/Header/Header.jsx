import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  const renderInput = (params) => (
    <InputBase
      ref={params.InputProps.ref}
      inputProps={params.inputProps}
      placeholder="Search..."
      classes={{ root: classes.inputRoot, input: classes.inputInput }}
    />
  );

  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            renderInput={renderInput}
            options={autocompleteOptions}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.description
            }
            filterOptions={(x) => x}
          >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;