import KPICards from "./KPICards";
import Heatmap from "./Heatmap";
import PortfolioPie from "./PortfolioPie";

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <KPICards />
      <PortfolioPie />
      <Heatmap />
    </div>
  );
};

export default DashboardHome;






