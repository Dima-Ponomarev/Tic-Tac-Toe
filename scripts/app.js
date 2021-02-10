const Player = (sign) =>{
    this.sign = sign;
    let occupiedTiles = [];
    const getSign = () => {
        return sign;
    };

    const reset = () =>{
        occupiedTiles.length = 0;
    }

    return {occupiedTiles, getSign, reset};
}

const gameBoard = (() => {
    const gameboard = ['', '', '', '', '', '', '', '', ''];
    const setTile = (index, sign) =>{
        gameboard[index] = sign;
    }

    const getTile = (index) =>{
        return gameboard[index]; 
    }

    const reset = () =>{
        for(let i = 0; i < gameboard.length; i++){
            gameboard[i] = '';
        }
    }

    return {
        setTile,
        getTile,
        reset
    }
})();

const displayController = (() => {
    const gameBoardDOM = document.querySelectorAll('.game-tile');
    const resetBtn = document.querySelector('.reset-btn');
    const status = document.querySelector('.status-text');


    gameBoardDOM.forEach((gameTile) => {
        gameTile.addEventListener('click', (e) =>{
            if (e.target.textContent !== '' || gameController.getGameIsOver()) return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    });

    const resetBtnHandler = () =>{
        setStatus("Player X's turn");
        gameController.reset();
        gameBoard.reset();
        updateGameboard();

    }

    resetBtn.addEventListener('click', resetBtnHandler);

    const updateGameboard = () =>{
        gameBoardDOM.forEach((tile, index) =>{
            tile.textContent = gameBoard.getTile(index);
        })
    };
    
    const setStatus = (message) =>{
        status.textContent = message;
    }
    
    return{
        setStatus
    }
})();

const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 0;
    let gameIsOver = false;

    const playRound = (tileIndex) =>{
        const player = getCurrentPlayer();
        player.occupiedTiles.push(tileIndex);
        gameBoard.setTile(tileIndex, player.getSign());
        const winner = checkWinner(player.occupiedTiles);
        if (checkWinner(player.occupiedTiles)){
            gameIsOver = true;
            console.log('gg')
            displayController.setStatus(`Player ${player.getSign()} has won!`);
            return;
        }

        if (round === 8) {
            gameIsOver = true;
            displayController.setStatus('Players drew!')
            return;
        }
        round++;
        player.getSign() === "X" ? displayController.setStatus("Player O's turn") :
            displayController.setStatus("Player X's turn");
    } 

    const getCurrentPlayer = () =>{
        return round % 2 === 1 ? playerO : playerX;
    }

    const checkWinner = (occupiedTiles) => {
        let status = false;
        winConditions =[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        winConditions.forEach(winCondition => {
            if (winCondition.every(index => occupiedTiles.includes(index))){
                status = true;
            }
        });
        return status;
    }

    const getGameIsOver = () =>{
        return gameIsOver;
    }

    const reset = () =>{
        round = 0;
        gameIsOver = false;
        playerO.reset();
        playerX.reset();
    }

    return{
        playRound,
        getGameIsOver,
        reset
    }
})();
