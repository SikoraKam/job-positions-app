import { ReactNode } from "react";

export interface ContentInsideContainerProps {
  noPadding: boolean;
  contentContainerClassname?: string;
  isLoading?: boolean;
  withScroll?: boolean;
  children: ReactNode;
}
