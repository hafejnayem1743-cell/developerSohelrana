import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CyberBackground } from './components/CyberBackground';
import { PublicNavbar } from './components/PublicNavbar';
import { PublicFooter } from './components/PublicFooter';
import { ScrollToTop } from './components/ScrollToTop';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServicePortfolioPage } from './pages/ServicePortfolioPage';
import { ServiceCustomWebPage } from './pages/ServiceCustomWebPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { FiverrPage } from './pages/FiverrPage';
import { PaymentPage } from './pages/PaymentPage';

// Admin Dashboard Page
import { AdminPage } from './pages/AdminPage';

// Public Layout Wrapper with futuristic background, navbar, and footer
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#04060B] text-slate-100 font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">
      <CyberBackground />
      <PublicNavbar />
      <main className="relative z-10 flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Read-Only Routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />
          <Route
            path="/skills"
            element={
              <PublicLayout>
                <SkillsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/courses"
            element={
              <PublicLayout>
                <CoursesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/courses/:courseSlug"
            element={
              <PublicLayout>
                <CourseDetailPage />
              </PublicLayout>
            }
          />
          <Route
            path="/services"
            element={
              <PublicLayout>
                <ServicesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/services/portfolio"
            element={
              <PublicLayout>
                <ServicePortfolioPage />
              </PublicLayout>
            }
          />
          <Route
            path="/services/custom-web"
            element={
              <PublicLayout>
                <ServiceCustomWebPage />
              </PublicLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <PublicLayout>
                <ProjectsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactPage />
              </PublicLayout>
            }
          />
          <Route
            path="/fiverr"
            element={
              <PublicLayout>
                <FiverrPage />
              </PublicLayout>
            }
          />
          <Route
            path="/payment"
            element={
              <PublicLayout>
                <PaymentPage />
              </PublicLayout>
            }
          />

          {/* Secure Admin Route */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
