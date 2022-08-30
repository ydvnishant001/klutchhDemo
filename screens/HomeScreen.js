import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions} from 'react-native'
import MyShifts from '../components/MyShifts';
import AvailableShifts from '../components/AvailableShifts';

const HomeScreen = () => {
  const { width, height } = Dimensions.get('window');
  const [activeTab, setActiveTab] = useState('myShifts')
  
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.mainContainer}>
    {activeTab === 'myShifts' ? <MyShifts/> : <AvailableShifts/>}
    <View style={styles.bottomTab(width)}>
    <View style={styles.bottomTab2}>
    <TouchableOpacity activeOpacity={.7} onPress={() => setActiveTab('myShifts')}>
    <Text style={styles.tab1(activeTab)}>My shifts</Text>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={.7} onPress={() => setActiveTab('availableShifts')}>
    <Text style={styles.tab2(activeTab)}>Available shifts</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  )   
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  bottomTab: (width) => ({position: 'absolute', bottom: 0, borderTopWidth: .5, borderTopColor: '#ccc', width: width, padding: 15,
  backgroundColor: '#F7F8FB'}),
  bottomTab2: {flexDirection: 'row', justifyContent: 'space-around'},
  tab1: (activeTab) => ({color: activeTab === 'myShifts' ? '#007bd3' : '#A4B8D3', fontFamily: 'Poppins-Medium', fontSize: 15}),
  tab2: (activeTab) => ({color: activeTab === 'availableShifts' ? '#007bd3' : '#A4B8D3', fontFamily: 'Poppins-Medium', fontSize: 15})
})

export default HomeScreen