import PropTypes from 'prop-types';

const Cell = ({ value, isRevealed, handleReveal, isFlag, handleFlag, setCountFlag }) => {

    const handleRightClick = (e) => {
        e.preventDefault();
        // console.log("c flag");
        if (isFlag) {
            setCountFlag((prev) => prev + 1);
        }
        else {
            setCountFlag((prev) => prev - 1);
        }
        handleFlag();
    };

    let displayCell = "";

    if (isRevealed) {
        if (value === -1) {
            displayCell = "💣";
        }
        else if (value > 0) {
            displayCell = value;
        }
    }
    else if (isFlag) {
        displayCell = "🚩";
    }

    return (

        <div onClick={handleReveal}
  onContextMenu={handleRightClick}
  className={`aspect-square w-[7vw] sm:w-10 max-w-[40px] relative border border-slate-700  text-lg
    flex justify-center items-center select-none  
  transition-all duration-200 ease-in-out text-white font-bold rounded-md  shadow-sm shadow-black
    ${isRevealed ?"text-lg shadow-inner bg-slate-700/30 shadow-slate-900 animate-pop"
      : "bg-slate-900 hover:bg-indigo-500 hover:scale-105 cursor-pointer"}
      ${(value === -1 && isRevealed === true) ? "bg-red-500" : ""}
    ${isFlag ? "border-yellow-500 animate-pulse" : ""} `}>

            {displayCell}
        </div>
    )

}
Cell.propTypes = {
    value: PropTypes.number.isRequired,
    isRevealed: PropTypes.bool.isRequired,
    handleReveal: PropTypes.func.isRequired,
    isFlag: PropTypes.bool.isRequired,
    handleFlag: PropTypes.func.isRequired,
    setCountFlag: PropTypes.func.isRequired,
};
export default Cell;