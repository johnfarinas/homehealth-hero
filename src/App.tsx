import { Refine } from "@refinedev/core";

import routerProvider, { NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { RefineAiErrorComponent } from "@/components/catch-all";

import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";

import { Toaster } from "@/components/refine-ui/notification/toaster";

import { Layout } from "@/components/refine-ui/layout/layout";

import { dataProvider } from "@/providers/data";

import { LandingPage } from "@/pages/landing-page";
import { ContactPage } from "@/pages/contact";
import { AboutPage } from "@/pages/about";
import { ServicesList } from "@/pages/services/list";
import { ServicesCreate } from "@/pages/services/create";
import { ServicesEdit } from "@/pages/services/edit";
import { TestimonialsList } from "@/pages/testimonials/list";
import { TestimonialsCreate } from "@/pages/testimonials/create";
import { TestimonialsEdit } from "@/pages/testimonials/edit";
import { StatisticsEdit } from "@/pages/statistics/edit";
import { HeroEdit } from "@/pages/hero/edit";
import { ContactEdit } from "@/pages/contact/edit";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        notificationProvider={useNotificationProvider}
        resources={[
          {
            name: "services",
            list: "/admin/services",
            create: "/admin/services/create",
            edit: "/admin/services/edit/:id",
          },
          {
            name: "testimonials",
            list: "/admin/testimonials",
            create: "/admin/testimonials/create",
            edit: "/admin/testimonials/edit/:id",
          },
          {
            name: "statistics",
            edit: "/admin/statistics",
          },
          {
            name: "hero-content",
            edit: "/admin/hero",
          },
          {
            name: "contact",
            edit: "/admin/contact",
          },
        ]}>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Contact Page */}
          <Route path="/contact" element={<ContactPage />} />
          {/* Public About Page */}
          <Route path="/about" element={<AboutPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <Layout>
                <Outlet />
              </Layout>
            }>
            <Route index element={<NavigateToResource fallbackTo="/admin/services" />} />

            {/* Services Routes */}
            <Route path="services">
              <Route index element={<ServicesList />} />
              <Route path="create" element={<ServicesCreate />} />
              <Route path="edit/:id" element={<ServicesEdit />} />
            </Route>

            {/* Testimonials Routes */}
            <Route path="testimonials">
              <Route index element={<TestimonialsList />} />
              <Route path="create" element={<TestimonialsCreate />} />
              <Route path="edit/:id" element={<TestimonialsEdit />} />
            </Route>

            {/* Statistics Route */}
            <Route path="statistics" element={<StatisticsEdit />} />

            {/* Hero Route */}
            <Route path="hero" element={<HeroEdit />} />

            {/* Contact Route */}
            <Route path="contact" element={<ContactEdit />} />

            <Route path="*" element={<RefineAiErrorComponent />} />
          </Route>
        </Routes>
        <Toaster />
        <UnsavedChangesNotifier />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
