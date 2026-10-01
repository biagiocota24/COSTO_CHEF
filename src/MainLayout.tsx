import MyNavbar from "./components/MyNavbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

const MainLayout = function () {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <MyNavbar />
        <main className="px-12 py-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
