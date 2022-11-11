function Box({ coordinates }) {
  const styling = {
    position: "absolute",
    top: coordinates.y + 50,
    left: coordinates.x,
    backgroundColor: "#fff",
    height: 100 + "px",
    width: 50 + "px",
  };

  return (
    <div className="box" style={styling}>
      <ul>
        <li>
          <button>Jotaro Kujo</button>
          <button>Saitama</button>
          <button>Asuka</button>
        </li>
      </ul>
    </div>
  );
}

export default Box;
