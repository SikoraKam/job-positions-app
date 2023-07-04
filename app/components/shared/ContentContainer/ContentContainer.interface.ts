import { ReactNode } from "react";
import { Edge } from "react-native-safe-area-context";

export interface ContentContainerInterface {
  title?: string;
  classname?: string;
  withHeader?: boolean;
  withBackButton?: boolean;
  backButtonBehaviour?(): void;
  isLoading?: boolean;
  children: ReactNode;
  noPadding?: boolean;
  withScroll?: boolean;
  error?: any;
  contentContainerClassname?: string;
  safeAreaEdges?: Edge[];
}
