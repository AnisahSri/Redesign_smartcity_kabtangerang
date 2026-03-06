import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageLoader from "../components/common/PageLoader.jsx";



// Lazy imports untuk semua halaman
const Home = lazy(() => import("../pages/Home.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const Persona = lazy(() => import("../pages/Persona.jsx"));
const Event = lazy(() => import("../pages/Agenda.jsx"));
const Dimensi = lazy(() => import("../pages/Dimension.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Sejarah = lazy(() => import("../pages/Sejarah.jsx"));
const Katalog = lazy(() => import("../pages/Katalog.jsx"));
const FasilitasPublik = lazy(() => import("../pages/FasilitasPublik.jsx"));
const SmartGovernance = lazy(() => import("../pages/explore-dimensions/SmartGovernance.jsx"));
const SmartLiving = lazy(() => import("../pages/explore-dimensions/SmartLiving.jsx"));
const SmartSociety = lazy(() => import("../pages/explore-dimensions/SmartSociety.jsx"));
const SmartEconomy = lazy(() => import("../pages/explore-dimensions/SmartEconomy.jsx"));
const SmartEnvironment = lazy(() => import("../pages/explore-dimensions/SmartEnvironment.jsx"));
const SmartBranding = lazy(() => import("../pages/explore-dimensions/SmartBranding.jsx"));
const Publication = lazy(() => import("../pages/Publication.jsx"));
const NotFound = lazy(() => import("../components/common/NotFound.jsx"));

function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* LAYOUT ROUTE: Semua rute anak akan memiliki Header, Footer, dan Logika Transisi */}
        <Route element={<Layout />}>

          {/* RUTE ANAK: Hanya panggil komponen Lazy Load */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sejarah" element={<Sejarah />} />
          <Route path="/persona" element={<Persona />} />
          <Route path="/event" element={<Event />} />
          <Route path="/dimensi" element={<Dimensi />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/fasilitaspublik" element={<FasilitasPublik />} />
          <Route path="/SmartGovernance" element={<SmartGovernance />} />
          <Route path="/publication" element={<Publication />} />
          <Route path="/SmartLiving" element={<SmartLiving />} />
          <Route path="/SmartSociety" element={<SmartSociety />} />
          <Route path="/SmartEconomy" element={<SmartEconomy />} />
          <Route path="/SmartEnvironment" element={<SmartEnvironment />} />
          <Route path="/SmartBranding" element={<SmartBranding />} />

        </Route>

        {/* Rute Login tanpa Layout */}
        <Route path="/login" element={<Login />} />

        {/* Rute 404/NotFound tanpa Layout (tanpa Header dan Footer) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
