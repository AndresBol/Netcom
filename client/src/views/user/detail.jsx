import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import UserService from "@services/user";
import { Loading } from "@components/loading";
import { View } from "@components/view";
import { UserManager } from "@components/managers/user";

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

  return (
    <View>
      <UserManager record={user} />
    </View>
  );
}
