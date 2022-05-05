import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { TemplateEditor } from "./pages/TemplateEditor";
import { VisualEditor } from "./pages/VisualEditor";
import { AppHeader } from "./ui/app-header/AppHeader";
import { AppMain } from "./ui/app-main/AppMain";
import { AppSidebar } from "./ui/app-sidebar/AppSidebar";
import { AppWrapper } from "./ui/app-wrapper/AppWrapper";

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <AppHeader>
          <div className="flex flex-row h-full pl-4 items-center">
            <Link className="text-orange-600 hover:underline" to="/">Templates</Link>
						<Link className="text-orange-600 hover:underline ml-4" to="/edit">Visual Editor</Link>
          </div>
        </AppHeader>
        <AppSidebar>
          <span>Sidebar</span>
        </AppSidebar>
        <AppMain>
          <Routes>
            <Route path="/" element={<TemplateEditor />} />
						<Route path="/edit" element={<VisualEditor />} />
          </Routes>
        </AppMain>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
