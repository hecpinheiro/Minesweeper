const createBoard = (rows, columns) => //Função q criar um Array de Arrays (matriz)
{
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                colums,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearmines:0

            }
        })
    })
}


const spreadMines = (board, minesAmount) => 
{
    const rows = board.length // pega a quantidade de linhas
    const columns = board[0].length // pega a quantidade de colunas dentro de linhas
    let minesPlanted = 0 

    while(minesPlanted < minesAmount) //gera minas aleatorias
    {
        const rowSel = parseInt(Math.random() * rows, 10) 
        const columnSel = parseInt(Math.random() * columns, 10) 

        if(!board[rowSel][columnSel].mined)
        {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}


const createMinesBoard = (rows, columns, minesAmount) => 
{
    const board = createBoard(rows,columns)
    spreadMines(board, minesAmount)
    return board
} 

export {createMinesBoard}