import React from 'react'

import LoggedAreaContainer from '../../containers/LoggedArea'

type PropTypes = {
  navigation: any,
}

const LoggedArea = ({ navigation }: PropTypes) => (
  <LoggedAreaContainer
    onClick={() => navigation.navigate('Transactions')}
  />
)

export default LoggedArea
