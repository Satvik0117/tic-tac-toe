import { useState } from "react";

function Box({ row, col, currentPlayer, boxSelected }) {
	const [symbol, setSymbol] = useState(null);

	const handleClick = () => {
		if (symbol === null) {
			if (currentPlayer == "0") {
				setSymbol("O");
			} else {
				setSymbol("X");
			}
			boxSelected(row, col);
		}
	};

	return (
		<div onClick={handleClick} className="box">
			{symbol}
		</div>
	);
}

export default Box;
