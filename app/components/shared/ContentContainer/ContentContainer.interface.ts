import { ReactNode } from "react";

export interface ContentContainerInterface {
  title?: string;
  textClassName?: string;
  withHeader?: boolean;
  withBackButton?: boolean;
  backButtonBehaviour?(): void;
  isLoading?: boolean;
  children: ReactNode;
  noPadding?: boolean;
  withScroll?: boolean;
  error?: any;
  contentContainerClassname?: string;
}
