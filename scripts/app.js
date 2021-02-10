const Player = (sign) =>{
    this.sign = sign;
    let occupiedTiles = [];
    const getSign = () => {
        return sign;
    };

    return {occupiedTiles, getSign};
}

const gameBoard = (() => {
    const gameboard = ['', '', '', '', '', '', '', '', ''];
    const setTile = (index, sign) =>{
        gameboard[index] = sign;
    }

    const getTile = (index) =>{
        return gameboard[index]; 
    }

    return {
        setTile,
        getTile
    }
})();

const displayController = (() => {
    const gameBoardDOM = document.querySelectorAll('.game-tile');

    gameBoardDOM.forEach((gameTile) => {
        gameTile.addEventListener('click', (e) =>{
            if (e.target.textContent !== '' || gameController.getGameStatus()) return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    })
    const updateGameboard = () =>{
        gameBoardDOM.forEach((tile, index) =>{
            tile.textContent = gameBoard.getTile(index);
        })
    }
    return{
        updateGameboard
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

        console.log(player.occupiedTiles);
        const winner = checkWinner(player.occupiedTiles);
        console.log(winner)
        if (checkWinner(player.occupiedTiles)){
            gameIsOver = true;
            console.log(`player ${player.getSign()} won`)
        }

        if (round === 8) {
            gameIsOver = true;
            console.log('draw', player.occupiedTiles)
        }
        round++;
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

    const getGameStatus = () =>{
        return gameIsOver;
    }

    return{
        playRound,
        getGameStatus
    }
})();
