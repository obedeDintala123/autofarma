import { useWindowDimensions } from 'react-native';

export default function useScreenType() {
  const { width } = useWindowDimensions();

  // A partir de 768px é considerado tablet/desktop
  return width >= 768 ? 'large' : 'small';
}
