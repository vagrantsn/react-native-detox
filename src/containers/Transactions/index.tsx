import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native'

type Transaction = {
  amount: number,
  customer: {
    name: string,
  },
  id: number,
}

type Props = {
  transactions: Array<Transaction>,
  onItemPress: Function,
  onRefresh: any,
  refreshing: boolean,
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    textAlign: 'center',
    fontSize: 22,
  },
})

const Item = ({
  item,
  onPress,
}: { item: Transaction, onPress: Function }) => (
  <TouchableHighlight
    testID={item.id.toString()}
    onPress={() => onPress(item.id)}
  >
    <Text style={styles.item}>
      {item.customer.name} - R${item.amount}
    </Text>
  </TouchableHighlight>
)

const TransactionsContainer = ({
  transactions,
  onItemPress,
  onRefresh,
  refreshing,
}: Props) => (
  <FlatList
    testID="flatList"
    data={transactions}
    onRefresh={onRefresh}
    refreshing={refreshing}
    renderItem={({ item }) => (
      <Item
        item={item}
        onPress={onItemPress}
      />
    )}
    keyExtractor={(item: Transaction) => item.id.toString()}
  />
)

export default TransactionsContainer
