import { View } from "@components/view";
import { TicketManager } from "@components/managers/ticket";
import { BackButton } from "@components/backbutton";
export function NewTicket() {
  return (
    <View>
      <TicketManager />
        <BackButton/>
    </View>
  );
}
