import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Border from '../../components/Border'
import { useNavigation, useRoute } from '@react-navigation/native'
import useStore from '../../store'

const SERVER_URL = 'http://10.3.141.1:3000/api/print'

export default ({ route }) => {
  const navigation = useNavigation()
  const routeHook = useRoute()
  const score = useStore(state => state.score)

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const print = async () => {
      try {
        await fetch(SERVER_URL)
      } catch (err) {
        console.log(err)
      }
      setDisabled(false)
    }
    if (score >= 3 && routeHook.name === 'End') print()
    else setDisabled(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeHook.name])

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.title}>C'est la fin !</Text>
      </View>
      <Border />
      <View style={styles.answer}>
        <Text style={[styles.text, styles.mb]}>Votre score est de :</Text>
        <Text
          style={[
            styles.text,
            styles.mb,
            score >= 3 ? styles.good : styles.bad,
          ]}
        >
          {score} / 5
        </Text>
        {score >= 3 ? (
          <>
            <Text style={[styles.text, styles.mb]}>
              Vous avez gagné le droit de participer à la tombola !
            </Text>
            <Text style={styles.text}>
              Votre ticket va bientôt s'imprimer... Ne l'oubliez pas !
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.text, styles.mb]}>Et bien ?</Text>
            <Text style={styles.text}>
              Retentez votre chance pour gagner votre ticket de tombola !
            </Text>
          </>
        )}
      </View>
      <Border />
      <View style={styles.next}>
        <Button
          raised
          title="Redémarrer le quizz"
          buttonStyle={styles.button}
          disabled={disabled}
          onPress={() => {
            navigation.navigate('Home')
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  result: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  good: {
    fontWeight: 'bold',
    color: '#2CC68F',
  },
  bad: {
    fontWeight: 'bold',
    color: '#FF6969',
  },
  answer: {
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Archer-Book',
    fontSize: 32,
    fontWeight: '100',
    color: '#000000',
  },
  mb: {
    marginBottom: 20,
  },
  next: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#000000',
  },
})
