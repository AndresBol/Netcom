import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import UserService from "@services/user";
import { Loading } from "@components/loading";
import { View } from "@components/view";
import { UserManager } from "@components/managers/user";
import UserTicketService from "@services/user-ticket";
import { Title1 } from "@components/typography";
import Table from "@components/table";
import { BackButton } from "@components/backbutton";


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
        let workload =0;

        try {
          const userTicketsRes = await UserTicketService.getByUserId(userId);
          const tickets = userTicketsRes.data || [];
          workload = tickets.length;
        } catch (error) {
          console.error("Error fetching user detail:", error);
        }

        const availability =
          workload === 0 ? "Available" : workload <= 3 ? "Busy" : "Overloaded";
        const res = await UserService.getById(userId);
        setUser({
          ...res.data,
          workload,
          availability,
        });
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

  return (
    <View styles={{marginBottom: 10}}>
      <UserManager record={user} />
      {(user.role_name === "Technician") && (
        <>
          <Divider sx={{ my: 3 }} />
          <Title1>Work Information</Title1>
          <Table
            data={[
              {
                availability: user.availability,
                workload: `${user.workload} tickets`,
              },
            ]}
            headTitles={[
              { label: "Availability", fieldName: "availability", fieldType: "string" },
              { label: "Workload", fieldName: "workload", fieldType: "string" },
            ]}
            tableTitle={"Current Status"}
            onRowClick={() => {}}
            hasPagination={false}
            dense={false}
          />
        </>
      )}
        <BackButton/>
    </View>
  );
}
