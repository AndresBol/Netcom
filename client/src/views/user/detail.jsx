import { Title1 } from "../../components/typography";
import { View } from "../../components/view";
import { useParams } from "react-router-dom";

export function UserDetail() {
  const { id } = useParams();
  const userId = Number(id);
  return (
    <View styles={styles.MainView}>
      <Title1>User id: {userId}</Title1>
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
