import { useEffect, useState } from "react";
import Box from "./Box";

function Board({ gridSize }) {
	const [currentPlayer, setCurrentPlayer] = useState(0);
	const [boxSymbols, setBoxSymbols] = useState();
	const [lastRow, setLastRow] = useState(-1);
	const [lastCol, setLastCol] = useState(-1);
	const [winner, setWinner] = useState(null);
	const togglePlayer = () => {
		setCurrentPlayer(1 - currentPlayer);
	};

	useEffect(() => {
		const boxSymbols = [];
		for (var i = 0; i < gridSize; i++) {
			const row = [];
			for (var j = 0; j < gridSize; j++) {
				row.push(null);
			}
			boxSymbols.push(row);
		}
		setBoxSymbols(boxSymbols);
	}, [gridSize]);

	const checkForWin = () => {
		// check for row
		let symbol = boxSymbols[lastRow][lastCol];
		console.log(boxSymbols, symbol);

		let isRow = true,
			isCol = true,
			isD = true,
			isAntiD = true;

		for (let i = 0; i < gridSize; i++) {
			if (boxSymbols[lastRow][i] !== symbol) {
				isRow = false;
			}
		}

		// check for col
		for (let i = 0; i < gridSize; i++) {
			if (boxSymbols[i][lastCol] !== symbol) {
				isCol = false;
			}
		}

		//  check for diag if row == col
		if (lastRow == lastCol) {
			for (let i = 0; i < gridSize; i++) {
				if (boxSymbols[i][i] !== symbol) {
					isD = false;
				}
			}
		} else {
			isD = false;
		}

		// check for anti diag if row + col == gridSz - 1
		if (lastRow + lastCol === gridSize - 1) {
			for (let i = 0; i < gridSize; i++) {
				if (boxSymbols[i][gridSize - 1 - i] !== symbol) {
					isAntiD = false;
				}
			}
		} else {
			isAntiD = false;
		}

		if (isRow || isCol || isAntiD || isD) {
			console.log("Winner - ", currentPlayer);
			setWinner(currentPlayer);
		}
		togglePlayer();
	};

	const boxSelected = (row, col) => {
		const newBoxSymbols = [...boxSymbols];
		newBoxSymbols[row][col] = currentPlayer;
		setLastRow(row);
		setLastCol(col);
		setBoxSymbols(newBoxSymbols);
	};

	useEffect(() => {
		if (lastRow == -1) return;
		checkForWin(lastRow, lastCol);
	}, [boxSymbols]);

	const getGrid = () => {
		const boxes = [];
		for (var i = 0; i < gridSize; i++) {
			for (var j = 0; j < gridSize; j++) {
				boxes.push({ row: i, col: j });
			}
		}
		return boxes;
	};

	return (
		<>
			<div style={{ "--gridSize": gridSize }} className="board-container">
				{getGrid().map((boxPosition, index) => {
					return (
						<Box
							row={boxPosition.row}
							col={boxPosition.col}
							key={index}
							boxSelected={boxSelected}
							currentPlayer={currentPlayer}
						></Box>
					);
				})}
			</div>
			{winner !== null && <h3> Player - {winner} wins!</h3>}
		</>
	);
}

export default Board;
