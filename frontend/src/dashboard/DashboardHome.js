
import KPICards from "./KPICards";
import Heatmap from "./Heatmap";
import PortfolioPie from "./PortfolioPie";

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <h2 className="dashboard-heading">📊 Dashboard Overview</h2>

      {/*  KPI Cards */}
      <div className="dashboard-section">
        <KPICards fallback={<div>Loading KPI cards...</div>} />
      </div>

      {/* Portfolio Pie Chart */}
      <div className="dashboard-section">
        <PortfolioPie fallback={<div>Loading portfolio pie chart...</div>} />
      </div>

      {/*  Heatmap */}
      <div className="dashboard-section">
        <Heatmap fallback={<div>Loading heatmap...</div>} />
      </div>
    </div>
  );
};

export default DashboardHome;





