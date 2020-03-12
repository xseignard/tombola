import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, CheckBox } from 'react-native-elements'
import Border from '../../components/Border'
import { useNavigation } from '@react-navigation/native'
import useStore from '../../store'

export default ({ route }) => {
  const navigation = useNavigation()
  const currentQuestions = useStore(state => state.currentQuestions)
  const incScore = useStore(state => state.incScore)
  const index = route.params.index
  const current = currentQuestions[index - 1]

  const [choice, setChoice] = useState(-1)

  useEffect(() => {
    setChoice(-1)
  }, [route])

  const handleNext = () => {
    if (choice === current.answer) incScore()
    navigation.navigate({
      name: 'Answer',
      params: { choice, index },
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.title}>{current.text}</Text>
      </View>
      <Border />
      <View style={styles.answers}>
        {current.choices.map((c, i) => (
          <CheckBox
            key={i}
            title={c}
            size={24}
            containerStyle={styles.checkbox}
            textStyle={styles.text}
            checkedColor="#2CC68F"
            checkedIcon="dot-circle-o"
            uncheckedColor="#3e3e3e"
            uncheckedIcon="circle-o"
            checked={choice === i}
            onPress={() => {
              setChoice(i)
            }}
          />
        ))}
      </View>
      <Border />
      <View style={styles.next}>
        <Button
          raised
          icon={<Icon name="chevron-left" size={15} color="white" />}
          title="Accueil"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate({ name: 'Home' })}
        />
        <Button
          raised
          disabled={choice < 0}
          icon={<Icon name="chevron-right" size={15} color="white" />}
          iconRight
          title={'Voir la réponse'}
          buttonStyle={styles.button}
          onPress={handleNext}
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
  question: {
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
  answers: {
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  checkbox: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 0,
  },
  text: {
    fontFamily: 'Archer-Book',
    fontSize: 32,
    fontWeight: '100',
    color: '#000000',
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
