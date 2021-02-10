const Player = (sign) =>{
    this.sign = sign;

    const getSign = () => {
        return this.sign;
    };

    return {getSign};
}

const gameBoard = (() => {
    const gameboard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'O'];
    const setTile = (index, sign) =>{
        gameboard[index] = sign;
    }

    return {
        setTile
    }
})();

