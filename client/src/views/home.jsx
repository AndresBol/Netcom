import React from "react";
import { useLoggedUser } from "@contexts/UserContext";
import { View } from "@components/view";
import { Title1, Title2 } from "@components/typography";

export function Home() {
  const { loggedUser } = useLoggedUser();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {loggedUser && <Title1>Welcome {loggedUser.name}!</Title1>}
      <Title2>Network tickets administration system - Netcom</Title2>
    </View>
  );
}
