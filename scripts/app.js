const Player = (sign) =>{
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return {getSign};
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
            if (e.target.textContent !== '') return;
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

    const playRound = (tileIndex) =>{
        gameBoard.setTile(tileIndex, getCurrentPlayerSign());
        round++;
    } 

    const getCurrentPlayerSign = () =>{
        return round % 2 === 1 ? playerO.getSign() : playerX.getSign();
    }
    return{
        playRound
    }
})();
