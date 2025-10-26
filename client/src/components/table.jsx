import * as React from "react";
import Box from "@mui/material/Box";
import TableMUI from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import FilterDialog from "./filter-dialog";
import { formatDate, formatTime } from "@utils/date-manager";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { Body } from "./typography";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function generateHeadCells(headTitles) {
  return headTitles
    .sort((a, b) => {
      if (a.fieldType === "one2many" && b.fieldType !== "one2many") return -1;
      if (a.fieldType !== "one2many" && b.fieldType === "one2many") return 1;
      return 0;
    })
    .map((headtitle) => ({
      id: headtitle.label.toLowerCase().trim().replace(/\s+/g, "_"),
      numeric: headtitle.fieldType === "number",
      disablePadding: false,
      label: headtitle.fieldType === "actionButton" ? "" : headtitle.label,
    }));
}

function EnhancedTableHead(props) {
  const { headCells, order, orderBy, onRequestSort, actionButton } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  if (actionButton) {
    headCells.push({
      id: "action_button",
      numeric: false,
      disablePadding: false,
      label: "",
    });
  }
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({
  tableTitle,
  onFilterBtnClick,
  hasActiveFilters,
}) {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
      ]}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {tableTitle}
      </Typography>
      <Tooltip title="Filter list">
        <IconButton
          onClick={onFilterBtnClick}
          color={hasActiveFilters ? "primary" : "default"}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

function formatData(data, type) {
  if (data === null || data === undefined) return "";

  switch (type) {
    case "dateTime":
      return formatDate(data, "en-US") + " " + formatTime(data, "en-US");
    default:
      return data;
  }
}

function ActionButton({ label, onClick }) {
  return (
    <TableCell onClick={onClick}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="secondary.main"
          aria-label={label}
        >
          <FileOpenIcon />
        </IconButton>
        <Body color="secondary.main" bold={true}>
          {label}
        </Body>
      </Box>
    </TableCell>
  );
}

function Row({ data: rowData }) {
  const [open, setOpen] = React.useState(false);
  const hasOne2Many = rowData.headTitles.some(
    (headTitle) => headTitle.fieldType === "one2many"
  );

  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={rowData.onRowClick}
        role="checkbox"
        tabIndex={-1}
        key={rowData.rowId}
        sx={{ cursor: "pointer" }}
      >
        {hasOne2Many && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {rowData.headTitles
          .filter((headTitle) => headTitle.fieldType !== "one2many")
          .map((headTitle, cellIndex) =>
            headTitle.fieldType === "actionButton" &&
            rowData.row[headTitle.fieldName].length != 0 ? (
              <ActionButton
                label={headTitle.label}
                onClick={rowData.onActionButtonClick}
              />
            ) : (
              <TableCell
                key={cellIndex}
                align={headTitle.fieldType === "number" ? "right" : "left"}
                component={cellIndex == 0 ? "th" : "td"}
                scope={cellIndex == 0 ? "row" : undefined}
              >
                {formatData(
                  rowData.row[headTitle.fieldName],
                  headTitle.fieldType
                )}
              </TableCell>
            )
          )}
        {rowData.actionButton && rowData.onActionButtonClick && (
          <ActionButton
            label={rowData.actionButton}
            onClick={rowData.onActionButtonClick}
          />
        )}
      </TableRow>
      {rowData.headTitles
        .filter((headTitle) => headTitle.fieldType === "one2many")
        .map((headTitle) => (
          <TableRow key={`expansion-${headTitle.fieldName}`}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Table
                    headTitles={headTitle.relationHeadTitles}
                    data={rowData.row[headTitle.fieldName]}
                    tableTitle={headTitle.label}
                    hasPagination={false}
                    dense={true}
                    onRowClick={() => {}}
                  />
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        ))}
    </React.Fragment>
  );
}

export default function Table({
  data,
  headTitles,
  tableTitle,
  onRowClick,
  hasPagination = true,
  dense = false,
  actionButton = null,
  onActionButtonClick = null,
}) {
  const headCells = generateHeadCells(headTitles);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({});

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterBtnClick = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setPage(0); // Reset to first page when filters change
  };

  // Get the fieldName from headTitles based on the headCell id
  const getFieldNameFromId = (headCellId) => {
    const headTitle = headTitles.find(
      (ht) => ht.label.toLowerCase().trim().replace(/\s+/g, "_") === headCellId
    );
    return headTitle?.fieldName || headCellId;
  };

  // Apply filters to data
  const filteredData = React.useMemo(() => {
    if (Object.keys(filters).length === 0) {
      return data;
    }

    return data.filter((row) => {
      for (const [fieldName, allowedValues] of Object.entries(filters)) {
        const rowValue = String(row[fieldName] || "");
        if (!allowedValues.includes(rowValue)) {
          return false;
        }
      }
      return true;
    });
  }, [data, filters]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const visibleRows = React.useMemo(() => {
    const fieldName = getFieldNameFromId(orderBy);
    return [...filteredData]
      .sort((a, b) => {
        const aValue = a[fieldName];
        const bValue = b[fieldName];
        if (bValue < aValue) {
          return order === "asc" ? 1 : -1;
        }
        if (bValue > aValue) {
          return order === "asc" ? -1 : 1;
        }
        return 0;
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, filteredData]);

  return (
    <>
      <FilterDialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        items={headTitles}
        data={data}
        onFilterApply={handleFilterApply}
        currentFilters={filters}
        dialogTitle={`Filter ${tableTitle}`}
      />
      <EnhancedTableToolbar
        tableTitle={tableTitle}
        onFilterBtnClick={handleFilterBtnClick}
        hasActiveFilters={Object.keys(filters).length > 0}
      />
      <TableContainer>
        <TableMUI
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            actionButton={actionButton}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              return (
                <Row
                  data={{
                    rowId: row.id,
                    headTitles,
                    row,
                    onRowClick: () => onRowClick(row),
                    actionButton,
                    onActionButtonClick: () => onActionButtonClick(row),
                  }}
                />
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </TableMUI>
      </TableContainer>
      {hasPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}
