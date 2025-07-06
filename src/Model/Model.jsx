import "./model.css";
import PropTypes from 'prop-types';
import victory from "../assets/victory.gif"
import over from "../assets/over.gif"

function Model({ msg, restart }) {
    const congratulationsImg = msg === "lost" ? over : victory;
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    {/* <div className="modal-header">
                        <button className="close-button" onClick={restart}>
                            &times;
                        </button>
                    </div> */}
                    <div className="flex items-center justify-center modal-content">
                        <img
                            src={
                                congratulationsImg
                            }
                            className="win-img"
                            alt={
                                msg === "win" ? "Victory!" : "Game Over!"
                            }
                        />
                    </div>
                    <div className="modal-message animate-bounce">{msg === "won" ? "🎉 You Won!" : "💥 Game Over"}</div>
                    <div className="gap-2 flex right-14 absolute">
                        <button className="play-again-button" onClick={restart}>
                            Play Again
                        </button>
                        <button className="close-button" onClick={restart}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
Model.propTypes = {
    msg: PropTypes.string.isRequired,
    restart: PropTypes.func.isRequired,
};
export default Model;