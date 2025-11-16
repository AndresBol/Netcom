import { View } from "@components/view";
import { useEffect, useState } from "react";
import CategoryService from "@services/category";
import { Box } from "@mui/material";
import { Loading } from "@components/loading";
import { useNavigate } from "react-router-dom";
import Table from "@components/table";
import { Title1 } from "@components/typography";
import { BackButton } from "@components/backbutton";
import { useLoggedUser } from "@contexts/UserContext";

export function CategoryIndex() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const tableHeadTitles = [
    { label: "Name", fieldName: "name", fieldType: "string" },
  ];

  const { loggedUser } = useLoggedUser();

  const navigate = useNavigate();

  const fetchModels = async () => {
    //Fetch Categories
    const response = await CategoryService.getAll();
    setCategories(response.data);

    console.log("Categories fetched:", response.data);
  };

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        await fetchModels();
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) return <Loading />;

  return (
    <View styles={styles.MainView}>
      <Table
        headTitles={tableHeadTitles}
        data={categories}
        onRowClick={(cat) => navigate(`/category/${cat.id}`)}
        tableTitle={<Title1>Available Categories</Title1>}
        onAddButtonClick={
          loggedUser?.role === "Administrator"
            ? () => navigate(`/category/new`)
            : undefined
        }
      />
      <Box>
        <BackButton />
      </Box>
    </View>
  );
}

const styles = {
  MainView: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    p: 2,
  },
};
