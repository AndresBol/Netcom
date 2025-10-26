import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import PropTypes from "prop-types";

dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(weekday);

// Set Monday as the first day of the week
dayjs.Ls.en.weekStart = 1;

// Custom styled PickersDay for week selection
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary.light,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.light,
    },
  }),
  // Monday is the start of the week (day.day() === 1)
  ...(day.day() === 1 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  // Sunday is the end of the week (day.day() === 0)
  ...(day.day() === 0 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  const start = selectedDay.startOf("week");
  const end = selectedDay.endOf("week");

  const dayIsBetween = day.isBetween(start, end, null, "[]");
  const isFirstDay = day.isSame(start, "day");
  const isLastDay = day.isSame(end, "day");

  const isSelected = isFirstDay || isLastDay || dayIsBetween;
  const isHovered = hoveredDay
    ? day.isBetween(
        hoveredDay.startOf("week"),
        hoveredDay.endOf("week"),
        null,
        "[]"
      )
    : false;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isSelected}
      isHovered={isHovered}
    />
  );
}

Day.propTypes = {
  day: PropTypes.object.isRequired,
  selectedDay: PropTypes.object,
  hoveredDay: PropTypes.object,
};

export function WeekCalendar({
  value,
  onChange,
  hoveredDay,
  onHoveredDayChange,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={onChange}
        showDaysOutsideCurrentMonth
        displayWeekNumber
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => onHoveredDayChange(ownerState.day),
            onPointerLeave: () => onHoveredDayChange(null),
          }),
        }}
      />
    </LocalizationProvider>
  );
}

WeekCalendar.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  hoveredDay: PropTypes.object,
  onHoveredDayChange: PropTypes.func.isRequired,
};
