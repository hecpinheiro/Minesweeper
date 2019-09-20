import { Dimensions } from 'react-native'

const params = { 
    blockSize: 30, // Tamanho do bloco que representa a mina
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, //Proporção do painel superio da tela (cabeçalho)
    difficultLevel: 0.1, // Porcentagem de minas no campo 

    getColumnsAmount() //Quantidade de colunas disponiveis baseado no blockSize e dimensões da tela
    {
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },

    getRowsAmount() //Quantidade de linhas baseado no tamanho da tela menos o haderRatio
    {
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }
}

export default params