import React from 'react'
import { StyleSheet, View } from 'react-native'

export default () => {
  return <View style={styles.border} />
}

const styles = StyleSheet.create({
  border: {
    height: 6,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderTopColor: 'black',
    borderTopWidth: 2,
  },
})
