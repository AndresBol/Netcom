import React from "react";
import Typography from "@mui/material/Typography";

export function Base({
  children,
  variant,
  bold = false,
  color = "text.secondary",
}) {
  const content =
    typeof children === "string"
      ? children.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < children.split("\n").length - 1 && <br />}
          </React.Fragment>
        ))
      : children;

  return (
    <Typography
      variant={variant}
      gutterBottom
      sx={{
        color: color,
        fontWeight: bold ? "bold" : "normal",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        gap: 1,
      }}
    >
      {content}
    </Typography>
  );
}

// Factory function
const createTypographyComponent = (variant) => {
  return ({ children, bold = false, color = "text.secondary" }) => (
    <Base variant={variant} bold={bold} color={color}>
      {children}
    </Base>
  );
};

export const Title1 = createTypographyComponent("h4");
export const Title2 = createTypographyComponent("h5");
export const SubTitle = createTypographyComponent("subtitle1");
export const Body = createTypographyComponent("body1");
