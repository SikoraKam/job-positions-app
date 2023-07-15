import { FC } from "react";
import { BottomActionBarProps } from "./BottomActionBar.interface";
import { BottomActionBarComponent } from "./BottomActionBar.component";
import { useBoundStore } from "../../../store/useBoundStore";

export const BottomActionBar: FC<BottomActionBarProps> = ({
  saveOffer,
  rejectOffer,
  acceptOffer,
}) => {
  return (
    <BottomActionBarComponent {...{ acceptOffer, rejectOffer, saveOffer }} />
  );
};
