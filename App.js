import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import params from './src/params'
//import Field from './src/components/Field'
import MineField from './src/components/mineField'
import {createMinedBoard} from './src/logic'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => // Calcula quantidade de minas necessárias baseado no difficultLevel
  {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    
    return Math.ceil(cols * rows * params.difficultLevel)
  }
  
  createState = () => // Calcula o Estado do jogo (minas abertas, flags...)
  {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Minesweeper</Text>
        <Text style={styles.instructions}>Matriz {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
        <View style={styles.board}><MineField board={this.state.board}/></View>
      </View>
    )}
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-end'
  },
  
  board:{
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  }
})
