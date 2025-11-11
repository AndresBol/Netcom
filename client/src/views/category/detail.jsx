import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Table from "@components/table";
import TicketLabelService from "@services/ticket-label";
import SpecialFieldService from "@services/special-field";
import PriorityService from "@services/priority";
import SlaService from "@services/sla";
import CategoryService from "@services/category";
import { useParams } from "react-router-dom";
import { Title1 } from "@components/typography";
import { Loading } from "@components/loading";
import { Divider } from "@mui/material";
import { BackButton } from "@components/backbutton";

export function CategoryDetail() {
  const { id } = useParams();
  const categoryId = id ? parseInt(id) : null;
  const [categoryName, setCategoryName] = useState("");
  const [labels, setLabels] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [slas, setSlas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const categoryRes = await CategoryService.getById(categoryId);
        setCategoryName(categoryRes.data.name);

        const [labelsRes, specialtiesRes, slasRes, prioritiesRes] =
          await Promise.all([
            TicketLabelService.getByCategoryId(categoryId),
            SpecialFieldService.getByCategory(categoryId),
            SlaService.getByCategory(categoryId),
            PriorityService.getAll(),
          ]);

        const priorities = prioritiesRes.data || [];

        const slasWithPriorityName = (slasRes.data || []).map((sla) => {
          const priority = priorities.find((p) => p.id === sla.priority_id);
          return {
            ...sla,
            priority_name: priority ? priority.name : "No priorities",
          };
        });

        setLabels(labelsRes.data || []);
        setSpecialties(specialtiesRes.data || []);
        setSlas(slasWithPriorityName);
      } catch (error) {
        console.error("Error fetching category details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) return <Loading />;

  const categoryHeadTitles = [
    [{ label: "Name", fieldName: "name", fieldType: "string" }],
    [
      { label: "Priority", fieldName: "priority_name", fieldType: "string" },
      {
        label: "Response Time",
        fieldName: "response_time",
        fieldType: "number",
      },
      {
        label: "Resolution Time",
        fieldName: "resolution_time",
        fieldType: "number",
      },
      { label: "SLA", fieldName: "name", fieldType: "string" },
    ],
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        gap: 4,
        paddingBottom: 10,
      }}
    >
      <Title1>{categoryName} Detail</Title1>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box>
          <Table
            data={labels}
            headTitles={categoryHeadTitles[0]}
            tableTitle={"Labels"}
            onRowClick={() => {}}
            hasPagination={false}
            dense={true}
          />
        </Box>
        <Box>
          <Table
            data={specialties}
            headTitles={categoryHeadTitles[0]}
            tableTitle={"Specialties"}
            onRowClick={() => {}}
            hasPagination={false}
            dense={true}
          />
        </Box>
      </Box>
      <Box>
        <Table
          data={slas}
          headTitles={categoryHeadTitles[1]}
          tableTitle={"SLAs"}
          onRowClick={() => {}}
          hasPagination={false}
          dense={true}
        />
      </Box>

      <Box>
        <BackButton/>
      </Box>
         
    </Box>
    
  );
}
