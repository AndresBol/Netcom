import { View } from "@components/view";
import { UserManager } from "@components/managers/user";
import { BackButton } from "@components/backbutton";
export function NewUser() {
  return (
    <View>
      <UserManager />
      <BackButton />
    </View>
  );
}
