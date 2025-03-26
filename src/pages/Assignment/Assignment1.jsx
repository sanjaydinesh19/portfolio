export default function Assignment1() {
  return (
    <div className="assignment-container">
      <h1>Assignment 1</h1>
      
      {/* Table Structure */}
      <table border="1" width="80%" className="styled-table">
        <tbody>
          <tr>
            <td rowSpan="2">A</td>
            <td>B</td>
            <td rowSpan="3">D</td>
            <td colSpan="2">E</td>
            <td>F</td>
          </tr>
          <tr>
            <td>C</td>
            <td rowSpan="2">G</td>
            <td rowSpan="2">H</td>
            <td rowSpan="2">I</td>
          </tr>
          <tr>
            <td colSpan="2">J</td>
          </tr>
          <tr>
            <td colSpan="3">K</td>
            <td>L</td>
            <td colSpan="2">M</td>
          </tr>
        </tbody>
      </table>
      
      <div className="question-separator"></div>

      {/* Chessboard */}
      <table className="chess-board" border="1">
        <tbody>
          {["♜♞♝♛♚♝♞♜", "♟♟♟♟♟♟♟♟", "        ", "        ", "        ", "        ", "♙♙♙♙♙♙♙♙", "♖♘♗♕♔♗♘♖"].map((row, i) => (
            <tr key={i}>
              {row.split("").map((piece, j) => (
                <td key={j} className={(i + j) % 2 === 0 ? "light" : "dark"}>{piece.trim()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}