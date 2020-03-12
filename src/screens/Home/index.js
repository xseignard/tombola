import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon } from 'react-native-elements'

import Border from '../../components/Border'
import useStore from '../../store'

export default () => {
  const navigation = useNavigation()
  const init = useStore(state => state.init)

  const handlePress = () => {
    init()
    navigation.navigate({ name: 'Question', params: { index: 1 } })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOMBOLA DES MARIÉS :</Text>
        <Text style={styles.title}>
          JOUEZ ET TENTEZ VOUS AUSSI DE REMPORTER LE JAMBON!
        </Text>
      </View>
      <Border />
      <View style={styles.start}>
        <Button
          raised
          icon={<Icon name="chevron-right" size={15} color="white" />}
          iconRight
          title="Démarrer le quizz"
          buttonStyle={styles.button}
          onPress={handlePress}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Archer-Book',
    fontSize: 40,
    color: '#000000',
    textAlign: 'center',
    marginTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },
  start: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#000000',
  },
})
