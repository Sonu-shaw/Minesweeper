import Cell from "./Cell"
import PropTypes from 'prop-types';


const Board = ({ playground, reveal, handleReveal, flag, handleFlag, setCountFlag }) => {
    console.log(playground);
    // const rows = playground.length;
    // const cols = playground[0]?.length || 0;
    return (
        <div className="grid gap-0.5 justify-center items-center  "
  style={{ gridTemplateColumns: `repeat(${playground[0].length}, minmax(1rem, 1fr))` }}>


            {playground.map((row, i) => row.map((col, j) => (
                <Cell key={`${i}-${j}`}
                    value={col}
                    isRevealed={reveal[i][j]}
                    handleReveal={() => handleReveal(i, j)}
                    isFlag={flag[i][j]}
                    handleFlag={() => handleFlag(i, j)}
                    setCountFlag={setCountFlag} />
            )))}
        </div>
    )
}
Board.propTypes = {
    playground: PropTypes.arrayOf(PropTypes.array).isRequired,
    reveal: PropTypes.arrayOf(PropTypes.array).isRequired,
    handleReveal: PropTypes.func.isRequired,
    flag: PropTypes.arrayOf(PropTypes.array).isRequired,
    handleFlag: PropTypes.func.isRequired,
    setCountFlag: PropTypes.func.isRequired
};

export default Board;