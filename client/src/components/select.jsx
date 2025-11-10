import MenuItem from "@mui/material/MenuItem";
import SelectMui from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

export function Select({
  field,
  data,
  model,
  multiple,
  error,
  helperText,
  disabled,
  sx,
}) {
  return (
    <FormControl variant="outlined" error={error} sx={sx}>
      <InputLabel id={model}>{model}</InputLabel>
      <SelectMui
        {...field}
        labelId={model}
        label={model}
        defaultValue={multiple ? [] : ""}
        variant="outlined"
        value={field.value || (multiple ? [] : "")}
        multiple={multiple}
        disabled={disabled}
      >
        {data &&
          data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </SelectMui>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
