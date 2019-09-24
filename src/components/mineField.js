import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import Field from './Field'


export default props => // transforma elementos do board em field jsx
{
    const rows = props.board.map((row, r) => 
    {
        const columns = row.map((field, c) => 
        {
            return <Field {...field} key={c}/> // array de jsx em colunas
        })
        return <View key={r} style={{flexDirection: 'row'}}>{columns}</View> // array de colunas
    })
    return <View styles={styles.container}>{rows}</View> // linhas do tabuleiro 
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE'
    }
})