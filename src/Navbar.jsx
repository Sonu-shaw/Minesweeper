import PropTypes from 'prop-types';
import hintOn from "./assets/hintOn.png"
import hintOff from "./assets/hintOff.png"

const Navbar = ({ level, handleLevel, countFlag, restart, handleHint, hint, hr, min, sec }) => {

    return (
        <div className="w-full bg-slate-900/40 backdrop-blur-md shadow-inner shadow-slate-900 
   text-white py-3 px-5 rounded-xl ">
  <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-sm sm:text-base">
    <select name="level" id="level"
      value={level} onChange={handleLevel}
      className="bg-indigo-600 text-white px-3 py-1 rounded shadow-md hover:bg-indigo-500 transition outline-none shadow-slate-900" >
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="expert">Expert</option>
    </select>

    <span className="font-bold text-yellow-300 ">🚩 Flag: {countFlag }</span>

    <button onClick={restart}
      className="bg-red-600 px-4 py-1 rounded text-white hover:bg-red-700 transition  shadow-md shadow-slate-900">
      Restart
    </button>

    <button onClick={handleHint}>
      <img src={!hint ? hintOn : hintOff} className={`h-6 sm:h-8 ${!hint?"animate-bounce":""}` }/>
    </button>

    <span className="font-bold font-mono text-green-300">
      🕒: {`${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`}
    </span>
  </div>
</div>

    );
}

Navbar.propTypes = {
    level: PropTypes.string.isRequired,
    handleLevel: PropTypes.func.isRequired,
    countFlag: PropTypes.number.isRequired,
    restart: PropTypes.func.isRequired,
    handleHint: PropTypes.func.isRequired,
    hint: PropTypes.bool.isRequired,
    hr: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    sec: PropTypes.number.isRequired,
};

export default Navbar;