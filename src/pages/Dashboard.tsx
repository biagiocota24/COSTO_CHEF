import MyNavbar from "../components/MyNavbar";
import Sidebar from "../components/Sidebar";

const Dashboard = function () {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <MyNavbar />
        <main className="px-12 py-6">qui qualcosa</main>
      </div>
    </div>
  );
};

export default Dashboard;
