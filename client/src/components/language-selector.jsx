import React from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, FormControl, Box } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", label: t("language.english"), flag: "🇺🇸" },
    { code: "es", label: t("language.spanish"), flag: "🇪🇸" },
  ];

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        sx={{
          color: "black",
          "&:before": {
            borderColor: "black",
          },
          "&:after": {
            borderColor: "black",
          },
          "& .MuiSvgIcon-root": {
            color: "black",
          },
        }}
        startAdornment={
          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
            <TranslateIcon sx={{ fontSize: 20 }} />
          </Box>
        }
      >
        {languages.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>{language.flag}</span>
              <span>{language.label}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
