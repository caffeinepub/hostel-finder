import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import HostelDetail from './pages/HostelDetail';
import AddHostel from './pages/AddHostel';
import EditHostel from './pages/EditHostel';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import SeoGuide from './pages/SeoGuide';
import Download from './pages/Download';
import Advertise from './pages/Advertise';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const hostelDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hostel/$id',
  component: HostelDetail,
});

const addHostelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/add-hostel',
  component: AddHostel,
});

const editHostelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/edit-hostel/$id',
  component: EditHostel,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: Privacy,
});

const disclaimerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/disclaimer',
  component: Disclaimer,
});

const seoGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/seo-guide',
  component: SeoGuide,
});

const downloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/download',
  component: Download,
});

const advertiseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/advertise',
  component: Advertise,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  hostelDetailRoute,
  addHostelRoute,
  editHostelRoute,
  privacyRoute,
  disclaimerRoute,
  seoGuideRoute,
  downloadRoute,
  advertiseRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
