import MenuItem from "@mui/material/MenuItem";
import SelectMui from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export function Select({ field, data, model }) {
  return (
    <>
      <InputLabel id={model}>{model}</InputLabel>
      <SelectMui
        {...field}
        labelId={model}
        label={model}
        defaultValue=""
        variant="outlined"
        value={field.value}
      >
        {data &&
          data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </SelectMui>
    </>
  );
}
