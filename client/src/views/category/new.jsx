import { View } from "@components/view";
import { CategoryManager } from "@components/managers/category";
import { BackButton } from "@components/backbutton";
export function NewCategory() {
  return (
    <View>
      <CategoryManager />
      <BackButton />
    </View>
  );
}
