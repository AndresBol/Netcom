import { Title1 } from "@components/typography";
import { SubTitle } from "@components/typography";
import { useParams } from "react-router-dom";
import Table from "@components/table";
import { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import UserService from "@services/user";
import { Loading } from "@components/loading";

export function UserDetail() {
  const { id } = useParams();
  const userId = id ? parseInt(id) : null;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);

      try {
        const res = await UserService.getById(userId);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Loading />;

  if (!user) {
    return (
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography> User not found</Typography>
      </Box>
    );
  }

  const basicHeadTitles = [
    { label: "Name", fieldName: "name", fieldType: "string" },
    { label: "Email", fieldName: "email", fieldType: "string" },
    { label: "Rol", fieldName: "role_name", fieldType: "string" },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Title1>User Detail</Title1>
      <SubTitle>{user.name}</SubTitle>

      <Divider sx={{ my: 2 }} />

      <Table
        data={[user]}
        headTitles={basicHeadTitles}
        tableTitle={"Basic Information"}
        onRowClick={() => {}}
        hasPagination={false}
        dense={false}
      />

      {user.role_name === "Technician" && user.special_fields?.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Title1>Special Fields</Title1>
          <Table
            data={user.special_fields.map((s) => ({
              name: s.special_field_name,
              category: s.category_name,
            }))}
            headTitles={[
              { label: "Specialty", fieldName: "name", fieldType: "string" },
              { label: "Category", fieldName: "category", fieldType: "string" },
            ]}
            tableTitle={"Specialties"}
            onRowClick={() => {}}
          />
        </>
      )}
    </Box>
  );
}
