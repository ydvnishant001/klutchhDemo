import React from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import RenderList from '../components/RenderList'

const MyShifts = () => {
  const days = [1,2,3,4,5,6]

    return(
      <ScrollView style={styles.scroll}>
        <RenderList from='myShifts'/>
        {days.map((item, index) => {
          return <RenderList addDays={index+1} from='myShifts'/>
        })}
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({
    scroll: {marginBottom: 57}
  })

  export default MyShifts