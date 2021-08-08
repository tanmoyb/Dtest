import React, { useState } from 'react'
import UserForm from '../UserForm/UserForm'
import UserTable from '../UserTable/UserTable'

interface Props {
  content: string;
}

const MainPageContainer: React.FC<Props> = ({
  content
}): React.ReactElement => (
  <div>
    <UserForm />
    <UserTable />
  </div>
)

export default MainPageContainer
