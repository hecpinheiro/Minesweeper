import React, {Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import params from './src/params'
import Field from './src/components/Field'





const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Minesweeper</Text>
      <Text style={styles.instructions}>Matriz {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
      <Field/>
      <Field opened />
      <Field opened nearMines={5}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
    
  },
  
  welcome:{

  }
});

export default App;
