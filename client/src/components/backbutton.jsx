import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";

export function BackButton({ label }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      sx={{ mt: 2 }}
    >
      {label || t("common.back")}
    </Button>
  );
}
