import { Title1 } from "@components/typography";
import { View } from "@components/view";
import { useEffect, useState } from "react";
import UserService from "@services/user";
import Table from "@components/table";
import { Loading } from "@components/loading";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@components/backbutton";
import { useLoggedUser } from "@contexts/UserContext";
import { useTranslation } from "react-i18next";

export function UserIndex() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();
  const tableHeadTitles = [
    { label: t("user.name"), fieldName: "name", fieldType: "string" },
    { label: t("user.email"), fieldName: "email", fieldType: "string" },
    { label: t("user.role"), fieldName: "role_name", fieldType: "string" },
  ];

  const { loggedUser } = useLoggedUser();

  const navigate = useNavigate();

  const fetchModels = async () => {
    //Fetch Users
    const response = await UserService.getAll();
    setUsers(response.data);

    console.log("Users fetched:", response.data);
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        await fetchModels();
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (loading) return <Loading />;

  return (
    <View styles={styles.MainView}>
      <Table
        headTitles={tableHeadTitles}
        data={users}
        onRowClick={(user) => navigate(`/user/${user.id}`)}
        tableTitle={<Title1>{t("user.title")}</Title1>}
        onAddButtonClick={
          loggedUser?.role === "Administrator"
            ? () => navigate(`/user/new`)
            : undefined
        }
      />
      <BackButton />
    </View>
  );
}

const styles = {
  MainView: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    bottomShadow: 2,
    p: 2,
  },
};
