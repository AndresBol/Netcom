import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Table from "@components/table";
import TicketLabelService from "@services/ticket-label";
import SpecialFieldService from "@services/special-field";
import PriorityService from "@services/priority";
import SlaService from "@services/sla";
import CategoryService from "@services/category";
import { useParams } from "react-router-dom";
import { CategoryManager } from "@components/managers/category";
import { Loading } from "@components/loading";
import { Divider } from "@mui/material";
import { BackButton } from "@components/backbutton";
import ManagerDialog from "@components/manager-dialog";
import { SpecialtyManager } from "@components/managers/specialty";
import { SLAManager } from "@components/managers/sla";
import { LabelManager } from "@components/managers/label";
import { useLoggedUser } from "@contexts/UserContext";
import { useTranslation } from "react-i18next";

export function CategoryDetail() {
  const { id } = useParams();
  const categoryId = id ? parseInt(id) : null;
  const [category, setCategory] = useState(null);
  const [labels, setLabels] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [slas, setSlas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [managerDialog, setManagerDialog] = useState({
    model: null,
    data: null,
  }); // 'label', 'specialty', 'sla', or null

  const { loggedUser } = useLoggedUser();
  const { t } = useTranslation();

  const fetchData = async () => {
    if (!categoryId) return;

    setLoading(true);

    try {
      const categoryRes = await CategoryService.getById(categoryId);
      setCategory(categoryRes.data);

      const [labelsRes, specialtiesRes, slasRes, prioritiesRes] =
        await Promise.allSettled([
          TicketLabelService.getByCategoryId(categoryId),
          SpecialFieldService.getByCategory(categoryId),
          SlaService.getByCategory(categoryId),
          PriorityService.getAll(),
        ]);

      const priorities =
        prioritiesRes.status === "fulfilled"
          ? prioritiesRes.value.data || []
          : [];

      const slasData =
        slasRes.status === "fulfilled" ? slasRes.value.data || [] : [];
      const slasWithPriorityName = slasData.map((sla) => {
        const priority = priorities.find((p) => p.id === sla.priority_id);
        return {
          ...sla,
          priority_name: priority ? priority.name : "No priorities",
        };
      });

      setLabels(
        labelsRes.status === "fulfilled" ? labelsRes.value.data || [] : []
      );
      setSpecialties(
        specialtiesRes.status === "fulfilled"
          ? specialtiesRes.value.data || []
          : []
      );
      setSlas(slasWithPriorityName);
    } catch (error) {
      console.error("Error fetching category details: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  if (loading) return <Loading />;

  const categoryHeadTitles = [
    [{ label: t("fields.name"), fieldName: "name", fieldType: "string" }],
    [
      {
        label: t("fields.priority"),
        fieldName: "priority_name",
        fieldType: "string",
      },
      {
        label: t("fields.responseTime"),
        fieldName: "response_time",
        fieldType: "time",
      },
      {
        label: t("fields.resolutionTime2"),
        fieldName: "resolution_time",
        fieldType: "time",
      },
      { label: t("fields.sla"), fieldName: "name", fieldType: "string" },
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
      <ManagerDialog
        open={managerDialog.model !== null}
        onClose={() => setManagerDialog({ model: null, data: null })}
      >
        {managerDialog.model === "label" && (
          <LabelManager
            categoryId={categoryId}
            record={managerDialog.data}
            onSuccess={() => {
              fetchData();
              setManagerDialog({ model: null, data: null });
            }}
          />
        )}
        {managerDialog.model === "specialty" && (
          <SpecialtyManager
            categoryId={categoryId}
            record={managerDialog.data}
            onSuccess={() => {
              fetchData();
              setManagerDialog({ model: null, data: null });
            }}
          />
        )}
        {managerDialog.model === "sla" && (
          <SLAManager
            categoryId={categoryId}
            record={managerDialog.data}
            onSuccess={() => {
              fetchData();
              setManagerDialog({ model: null, data: null });
            }}
          />
        )}
      </ManagerDialog>
      <CategoryManager record={category} />
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
            onRowClick={(rData) =>
              setManagerDialog({ model: "label", data: rData })
            }
            onAddButtonClick={
              loggedUser?.role === "Administrator"
                ? () => setManagerDialog({ model: "label", data: null })
                : undefined
            }
            hasPagination={false}
            dense={true}
          />
        </Box>
        <Box>
          <Table
            data={specialties}
            headTitles={categoryHeadTitles[0]}
            tableTitle={"Specialties"}
            onRowClick={(rData) =>
              setManagerDialog({ model: "specialty", data: rData })
            }
            onAddButtonClick={
              loggedUser?.role === "Administrator"
                ? () => setManagerDialog({ model: "specialty", data: null })
                : undefined
            }
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
          onRowClick={(rData) =>
            setManagerDialog({ model: "sla", data: rData })
          }
          onAddButtonClick={
            loggedUser?.role === "Administrator"
              ? () => setManagerDialog({ model: "sla", data: null })
              : undefined
          }
          hasPagination={false}
          dense={true}
        />
      </Box>

      <Box>
        <BackButton />
      </Box>
    </Box>
  );
}
