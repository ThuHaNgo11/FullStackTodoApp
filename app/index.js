import React from 'react'
import { Redirect } from 'expo-router'

const index = () => {
    return (
        // <Redirect href="/(tabs)/Home"/>
        <Redirect href="/(authenticate)/login"/>
    )
}

export default index;
