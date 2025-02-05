import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDownGenerics({
  data,
  label,
  handleChange,
  defaultMonth,
}) {
  const [selectValue, setSeletedValue] = React.useState(defaultMonth);

  const handleChangeInTextField = (value) => {
    setSeletedValue(value);
    handleChange(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          label={label}
          value={selectValue}
          onChange={(event) => handleChangeInTextField(event.target.value)}
        >
          {data.map((d) => (
            <MenuItem key={d.value} value={d.value}>
              {d.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
