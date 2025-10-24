import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * Generic Filter Dialog Component
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onClose - Callback when dialog closes
 * @param {array} items - Array of items to filter by, each item should have: label, fieldName, fieldType (optional)
 * @param {array} data - Array of data rows to extract unique values from
 * @param {function} onFilterApply - Callback with selected filters
 * @param {object} currentFilters - Current active filters
 * @param {string} dialogTitle - Title of the dialog (default: "Filter Table")
 * @param {string} excludeFieldType - Field type to exclude from filter options (default: "one2many")
 */
export default function FilterDialog({
  open,
  onClose,
  items,
  data,
  onFilterApply,
  currentFilters,
  dialogTitle = "Filter Table",
  excludeFieldType = "one2many",
}) {
  const [selectedFilters, setSelectedFilters] = React.useState(currentFilters);
  const [expandedColumn, setExpandedColumn] = React.useState(null);

  React.useEffect(() => {
    setSelectedFilters(currentFilters);
  }, [currentFilters]);

  const getUniqueValues = (fieldName) => {
    const values = data
      .map((row) => row[fieldName])
      .filter((value) => value !== null && value !== undefined && value !== "")
      .map((value) => String(value))
      .sort();
    return [...new Set(values)];
  };

  const handleToggleColumn = (fieldName) => {
    setExpandedColumn(expandedColumn === fieldName ? null : fieldName);
  };

  const handleToggleValue = (fieldName, value) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (!updated[fieldName]) {
        updated[fieldName] = [];
      }
      const index = updated[fieldName].indexOf(value);
      if (index > -1) {
        updated[fieldName].splice(index, 1);
      } else {
        updated[fieldName].push(value);
      }
      if (updated[fieldName].length === 0) {
        delete updated[fieldName];
      }
      return updated;
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    setExpandedColumn(null);
  };

  const handleApplyFilters = () => {
    onFilterApply(selectedFilters);
    onClose();
  };

  const filterableItems = items.filter(
    (item) => !excludeFieldType || item.fieldType !== excludeFieldType
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <List>
            {filterableItems.map((item, index, arr) => (
              <React.Fragment key={item.fieldName}>
                <ListItemButton
                  onClick={() => handleToggleColumn(item.fieldName)}
                >
                  <ListItemText primary={item.label} />
                  {expandedColumn === item.fieldName ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </ListItemButton>
                {expandedColumn === item.fieldName && (
                  <Box sx={{ pl: 4, py: 1 }}>
                    <List dense>
                      {getUniqueValues(item.fieldName).map((value) => (
                        <ListItem
                          key={`${item.fieldName}-${value}`}
                          disablePadding
                        >
                          <ListItemButton
                            role={undefined}
                            onClick={() =>
                              handleToggleValue(item.fieldName, value)
                            }
                            dense
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={
                                  selectedFilters[item.fieldName]?.includes(
                                    value
                                  ) || false
                                }
                                tabIndex={-1}
                                disableRipple
                              />
                            </ListItemIcon>
                            <ListItemText primary={value} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
                {index < arr.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearFilters} color="warning">
          Clear Filters
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApplyFilters} variant="contained">
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
}
