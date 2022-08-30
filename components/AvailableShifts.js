import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView} from 'react-native'
import { useSelector } from 'react-redux';
import RenderList from './RenderList';

const AvailableShifts = () => {
    const {allShifts} = useSelector(state => state.shiftReducers)
    const [activeTab, setActiveTab] = useState(1)
    const { width, height } = Dimensions.get('window');
    const days = [1,2,3,4,5,6]
    
    return(
        <>
        <View style={styles.topTab(width)}>
        <View style={styles.topTab2}>
        <TouchableOpacity onPress={() => setActiveTab(1)} activeOpacity={.7}>
        <Text style={styles.tab1(activeTab)}>Helsinki {`(${allShifts.filter(item => item.area === 'Helsinki').length})`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab(2)} activeOpacity={.7}>
        <Text style={styles.tab2(activeTab)}>Tampere {`(${allShifts.filter(item => item.area === 'Tampere').length})`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab(3)} activeOpacity={.7}>
        <Text style={styles.tab3(activeTab)}>Turku {`(${allShifts.filter(item => item.area === 'Turku').length})`}</Text>
        </TouchableOpacity>
        </View>
        </View>
        <ScrollView style={styles.scroll}>
        <RenderList activeTab={activeTab} from='availableShifts'/>
        {days.map((item, index) => {
          return <RenderList activeTab={activeTab} addDays={index+1} from='availableShifts'/>
        })}
      </ScrollView>
      </>
    )
  }

  const styles = StyleSheet.create({
    topTab: (width) => ({width: width, position: 'absolute', top: 0, paddingVertical: 18, borderBottomWidth: .5,
    borderBottomColor: 'grey'}),
    topTab2: {flexDirection: 'row', justifyContent: 'space-around'},
    tab1: (activeTab) => ({fontFamily: 'Poppins-Medium', fontSize: 15, color: activeTab === 1 ? '#007bd3' : '#A4B8D3'}),
    tab2: (activeTab) => ({fontFamily: 'Poppins-Medium', fontSize: 15, color: activeTab === 2 ? '#007bd3' : '#A4B8D3'}),
    tab3: (activeTab) => ({fontFamily: 'Poppins-Medium', fontSize: 15, color: activeTab === 3 ? '#007bd3' : '#A4B8D3'}),
    scroll: {marginBottom: 57, marginTop: 63},
  })

  export default AvailableShifts