import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native'

type Transaction = {
  id: number,
}

type Props = {
  transactions: Array<Transaction>,
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    textAlign: 'center',
    fontSize: 22,
  },
})

const Item = ({
  id,
  onPress,
}) => (
  <TouchableHighlight onPress={() => onPress(id)}>
    <Text style={styles.item}>{id}</Text>
  </TouchableHighlight>
)

const TransactionsContainer = ({
  transactions,
  onItemPress,
}: Props) => (
  <FlatList
    data={transactions}
    renderItem={({ item }) => (
      <Item
        id={item.id}
        onPress={onItemPress}
      />
    )}
    keyExtractor={(item: Transaction) => item.id.toString()}
  />
)

export default TransactionsContainer
