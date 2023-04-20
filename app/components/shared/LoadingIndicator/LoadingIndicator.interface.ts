export interface LoadingIndicatorProps {
  fullscreen?: boolean;
  fillContainer?: boolean;
  color?: string;
  sizeIOS?: typeof LoadingIndicatorSizeTypes[number];
  sizeAndroid?: number;
}

export const LoadingIndicatorSizeTypes = ['small', 'large'] as const;
