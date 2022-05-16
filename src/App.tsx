import { Link, Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StaticRoutes, StaticRouteType } from "./routes";
import { AppHeader } from "./ui/app-header/AppHeader";
import { AppMain } from "./ui/app-main/AppMain";
import { AppSidebar } from "./ui/app-sidebar/AppSidebar";
import { AppWrapper } from "./ui/app-wrapper/AppWrapper";

function App() {
  return (
    <BrowserRouter>
			<AppWrapper>
        <AppHeader>
          <span>Header</span>
        </AppHeader>
        <AppSidebar>
          {StaticRoutes.map((r: StaticRouteType) => {
            return (
              <Link className="mb-4" to={r.path} key={r.path}>
                {r.title}
              </Link>
            );
          })}
        </AppSidebar>
        <AppMain>
          <Routes>
            {StaticRoutes.map((r: StaticRouteType) => {
              return <Route path={r.path} element={r.element()} key={r.path} />;
            })}
						<Route path="*" element={<Navigate to="/templates" replace />}/>
          </Routes>
        </AppMain>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
