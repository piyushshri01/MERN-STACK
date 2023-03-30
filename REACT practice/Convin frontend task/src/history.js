export const History = ({ data }) => {
  // console.log(data, "data");

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Video Name</th>
            <th scope="col">Url</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((card, i) => (
            <tr key={i}>
              <th scope="row">{i}</th>
              <td>{card.name}</td>
              <td>{card.url}</td>
              <td>{card.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
