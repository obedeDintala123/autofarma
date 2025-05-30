// routes/AppRoutes.tsx
import { useAuth } from '@/context/auth-context';
import PublicRoutes from './public-routes';
import PrivateRoutes from './private-routes';

export default function AppRoutes() {
  const { user } = useAuth();

  return user ? <PrivateRoutes /> : <PublicRoutes />;
}
