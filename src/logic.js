const createBoard = (rows, columns) => //Função q criar um Array de Arrays (matriz)
{
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                columns,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines:0

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

const createMinedBoard = (rows, columns, minesAmount) => 
{
    const board = createBoard(rows,columns)
    spreadMines(board, minesAmount)
    return board
} 

const cloneBoard = board => // Cria um clone de board para n mexer diretamente no bord ao alterar o estado
{
    return board.map(rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}

const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row-1, row, row+1] // pega as possíveis celulas com vizinhos
    const columns = [column-1, column, column+1]
    
    //forEach executa uma função em todos os indices do array
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !==column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            
            if (different && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })        
    })
    return neighbors
}

const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row , column).reduce(safes, true)// Verifica se a vizinhança está minada  
}

const openField = (board, row, column) => 
{ 
    const field = board[row][column]
    
    if (!field.opened) { // Abre um campo
        field.opened = true
        
        if (field.mined) { // Abre um campo minado
            field.exploded = true 
        } 
        else if (safeNeighborhood(board, row, column)) { // Abre de forma recursiva os campos seguros 
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))
        }
        else { // Calcula quantidade de minas ao redor
            const neighbor = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = board => [].concat(...board) // Faz a matriz virar um único array, colocando dentro de um array vazio

const hadExplosion = board => fields(board) // Pega os campos explodidos
    .filter(field => field.exploded).length > 0

const pendding = field => (field.mined && !field.flagged) // Verifica se há algum campo aberto && nao marcado
    || (!field.mined && !field.opened)

const wonGame = board => fields(board).filter(pendding).length === 0 // Verifica se o jogo foi ganho

const showMines = board => fields(board).filter(field => field.mined) // Mostra todas as minas que existem no campo
    .forEach(field => field.opened = true)


export {
    createMinedBoard,
    cloneBoard,
    openField,
    wonGame,
    showMines,
    hadExplosion
}