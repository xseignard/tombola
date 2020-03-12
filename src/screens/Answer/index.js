import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import Border from '../../components/Border'
import { useNavigation } from '@react-navigation/native'
import useStore from '../../store'

export default ({ route }) => {
  const navigation = useNavigation()
  const currentQuestions = useStore(state => state.currentQuestions)
  const score = useStore(state => state.score)
  const goodText = useStore(state => state.answers[score - 1])
  const index = route.params.index
  const current = currentQuestions[index - 1]
  const goodAnswer = route.params.choice === current.answer

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={[styles.title, goodAnswer ? styles.good : styles.bad]}>
          {goodAnswer ? goodText.title : 'Loupé !'}
        </Text>
      </View>
      <Border />
      <View style={styles.answer}>
        {goodAnswer ? (
          <Text style={styles.text}>{goodText.text}</Text>
        ) : (
          <>
            <Text style={[styles.text, styles.mb]}>
              La bonne réponse était :
            </Text>
            <Text style={styles.text}>{current.choices[current.answer]}</Text>
          </>
        )}
      </View>
      <Border />
      <View style={styles.next}>
        <Button
          raised
          icon={<Icon name="chevron-left" size={15} color="white" />}
          title="Accueil"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          raised
          icon={<Icon name="chevron-right" size={15} color="white" />}
          iconRight
          title={index === 5 ? 'Voir les résultats' : 'Prochaine question'}
          buttonStyle={styles.button}
          onPress={() => {
            if (index !== 5) {
              navigation.navigate({
                name: 'Question',
                params: { index: index + 1 },
              })
            } else {
              navigation.navigate({ name: 'End' })
            }
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
    color: '#2CC68F',
  },
  bad: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#000000',
  },
})
