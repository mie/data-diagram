import { lazy, Suspense } from "react";
import { Link, Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppHeader } from "./ui/app-header/AppHeader";
import { AppMain } from "./ui/app-main/AppMain";
import { AppSidebar } from "./ui/app-sidebar/AppSidebar";
import { AppWrapper } from "./ui/app-wrapper/AppWrapper";

const VisualEditor = lazy(() => import("./pages/VisualEditor"));
const TemplateEditor = lazy(() => import("./pages/TemplateEditor"));

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <AppHeader>
          <span>Header</span>
        </AppHeader>
        <AppSidebar>
          <Link className="mb-4" to="/templates">
            Templates
          </Link>
          <Link className="mb-4" to="/graph">
            Graph
          </Link>
        </AppSidebar>
        <AppMain>
          <Suspense fallback={<div className="loader">Loading page...</div>}>
            <Routes>
              <Route path="/graph" element={<VisualEditor />} />;
              <Route path="/templates" element={<TemplateEditor />} />;
              <Route path="*" element={<Navigate to="/templates" replace />} />
            </Routes>
          </Suspense>
        </AppMain>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
