import { FC } from "react";
import { BottomActionBarProps } from "./BottomActionBar.interface";
import { BottomActionBarComponent } from "./BottomActionBar.component";
import { useBoundStore } from "../../../store/useBoundStore";

export const BottomActionBar: FC<BottomActionBarProps> = () => {
  const saveOffer = useBoundStore((state) => state.addToSavedForFuture);
  const acceptOffer = useBoundStore((state) => state.addToAccepted);
  const rejectOffer = useBoundStore((state) => state.addToRejected);

  return <BottomActionBarComponent />;
};
