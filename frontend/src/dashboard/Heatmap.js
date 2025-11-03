const Heatmap = () => {
  const timeSlots = ["Morning", "Afternoon", "Evening"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="heatmap">
      <h3>Engagement Heatmap</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            {timeSlots.map((slot) => (
              <th key={slot}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {timeSlots.map((slot) => (
                <td key={slot} className="heat-cell">
                  {Math.floor(Math.random() * 100)}%
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Heatmap;