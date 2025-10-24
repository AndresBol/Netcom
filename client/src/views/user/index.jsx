import { Title1 } from "@components/typography";
import { View } from "@components/view";
import { useEffect, useState } from "react";
import UserService from "@services/user";
import Table from "@components/table";
import { Loading } from "@components/loading";
import { useNavigate } from "react-router-dom";

export function UserIndex() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const tableHeadTitles = [
    { label: "Name", fieldName: "name", fieldType: "string" },
    { label: "Email", fieldName: "email", fieldType: "string" },
    { label: "Role", fieldName: "role_name", fieldType: "string" },
  ];

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
      <Title1>Available Users</Title1>
      <Table
        headTitles={tableHeadTitles}
        data={users}
        onRowClick={(user) => navigate(`/user/${user.id}`)}
        tableTitle="User List"
      />
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
