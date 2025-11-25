import { Title1 } from "./typography";
import CircularProgress from "@mui/material/CircularProgress";
import { View } from "./view";
import { useTranslation } from "react-i18next";

export function Loading({ items, loadedItems }) {
  const { t } = useTranslation();
  let value = 0;
  if (items != null && loadedItems != null && items > 0) {
    value = (loadedItems / items) * 100;
  }
  return (
    <View
      styles={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title1>{t("common.loading")}</Title1>
      <CircularProgress
        enableTrackSlot
        {...(items == null ? {} : { variant: "determinate", value })}
      />
    </View>
  );
}
