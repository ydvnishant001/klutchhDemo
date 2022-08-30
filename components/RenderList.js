import React from "react"
import {FlatList, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import {assortList, dateHeader, shiftHeader} from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { bookShift, cancelBookedShift, setLoading } from "../actions/shiftActions";
import { WithLocalSvg } from "react-native-svg";

const RenderList = ({activeTab, addDays, from}) => {
    const {allShifts} = useSelector(state => state.shiftReducers)
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch()
    const listData = (from === 'myShifts' ? allShifts.filter(item => item.booked) : allShifts) || []

    if(!assortList(listData, from, addDays, activeTab) || assortList(listData, from, addDays, activeTab).length === 0){
    return <>
        <Text style={styles.day}>{dateHeader(addDays) + "   "}
        {from === 'myShifts' && <Text style={styles.shiftInfo}>{assortList(listData, from, addDays, activeTab).length} shifts,
        {" " + shiftHeader(assortList(listData, from, addDays, activeTab))}h</Text>}
        </Text>
        <Text style={styles.emptyList}>No Shifts found</Text>
        </>
    }

    function shiftCancelHandler(id){
        var val = true
        dispatch(setLoading(id, val))
        setTimeout(() => {
            dispatch(cancelBookedShift(id))
            val = false
            dispatch(setLoading(id, val))
        },500)
    }

    function shiftBookHandler(id){
        var val = true
        dispatch(setLoading(id, val))
        setTimeout(() => {
            dispatch(bookShift(id))
            val = false
            dispatch(setLoading(id, val))
        },500)
    }
    
    function inProgress(day, startHour, endHour){ //to handle inProgress Shifts
        if(new Date().getDay() === day && new Date().getHours() >= startHour && new Date().getHours() < endHour){
            return true
        }
        else return false
    }

    function overlap(item){ //to handle shifts that overlap each other
        if(new Date().getDay() === item.day && !item.booked && assortList(listData, from, addDays, activeTab).some((childItem) => {
        return(childItem.booked && ((item.startTime.hour >= childItem.startTime.hour && item.startTime.hour < childItem.endTime.hour)
        || (item.endTime.hour > childItem.startTime.hour && item.endTime.hour <= childItem.endTime.hour)))
        })
        ){
            return true
        }
        else return false    
    }

    return(
        <><Text style={styles.day}>{dateHeader(addDays) + "   "}
        {from === 'myShifts' && <Text style={styles.shiftInfo}>{assortList(listData, from, addDays, activeTab).length} shifts,
        {" " + shiftHeader(assortList(listData, from, addDays, activeTab))}h</Text>}
        </Text>
        <FlatList
        data={assortList(listData, from, addDays, activeTab)}
        renderItem={({item}) => {
        return (
        <View style={styles.shiftView}>
        {from === 'myShifts' ? <>
        <View>
        <Text style={styles.time}>{item.startTime.hour}:{item.startTime.minutes || '00'}-{item.endTime.hour}:
        {item.endTime.minutes || '00'}</Text>
        <Text style={styles.place2}>{item.area}</Text>
        </View>
        <TouchableOpacity disabled={inProgress(item.day, item.startTime.hour, item.endTime.hour) ? true : false}
        onPress={() => shiftCancelHandler(item.id)}
        style={styles.buttonTouch2(inProgress(item.day, item.startTime.hour, item.endTime.hour))}>
        {item.booked && item.loading ? <View style={{paddingVertical: 3, paddingHorizontal: 10}}>
        <WithLocalSvg width={20} height={20} asset={require("../assets/media/spinner_red.svg")} />
        </View> : !item.booked && item.loading ? <View style={{paddingVertical: 3, paddingHorizontal: 10}}>
        <WithLocalSvg width={20} height={20} asset={require("../assets/media/spinner_green.svg")} />
        </View> :
        <Text style={styles.buttonText2(inProgress(item.day, item.startTime.hour, item.endTime.hour))}>Cancel</Text>}
        </TouchableOpacity>
        </> : <>
        <Text style={styles.time}>{item.startTime.hour}:{item.startTime.minutes || '00'}-{item.endTime.hour}:
        {item.endTime.minutes || '00'}</Text>
        <Text style={styles.status(width, overlap(item))}>{overlap(item) ? 'Overlapping' : item.booked ? 'Booked' : ''}</Text>
        <TouchableOpacity disabled={overlap(item) ? true :
        (item.booked && inProgress(item.day, item.startTime.hour, item.endTime.hour)) ? true : false}
        onPress={() => {!item.booked ? shiftBookHandler(item.id) : shiftCancelHandler(item.id)}}
        style={styles.buttonTouch(item.booked, inProgress(item.day, item.startTime.hour, item.endTime.hour), overlap(item))}>
        {item.booked && item.loading ? <View style={{paddingVertical: 3, paddingHorizontal: 10}}>
        <WithLocalSvg width={20} height={20} asset={require("../assets/media/spinner_red.svg")} />
        </View> : !item.booked && item.loading ? <View style={{paddingVertical: 3, paddingHorizontal: 10}}>
        <WithLocalSvg width={20} height={20} asset={require("../assets/media/spinner_green.svg")} />
        </View> :
        <Text style={styles.buttonText(item.booked, inProgress(item.day, item.startTime.hour, item.endTime.hour), overlap(item))}>
        {!item.booked ? 'Book' : 'Cancel'}</Text>}
        </TouchableOpacity>
        </>}
        </View>)}}
        keyExtractor={(item) => item.id}/></>
    )}

const styles = StyleSheet.create({
    day: {borderBottomWidth: .5, borderBottomColor: '#ccc', paddingVertical: 10, paddingLeft: 15, backgroundColor: '#F1F4F8',
    color: '#4F6C92', fontFamily: 'Poppins-SemiBold', fontSize: 15},
    shiftInfo: {color: '#A4B8D3', fontFamily: 'Poppins-Medium', fontSize: 14},
    shiftView: {flexDirection: 'row', paddingVertical: 15, borderBottomWidth: .5, borderBottomColor: '#ccc'},
    time: {paddingLeft: 15, color: '#4F6C92', fontFamily: 'Poppins-Medium', fontSize: 16},
    status: (width, overlap) => ({position: 'absolute', right: width/2.5, alignSelf: 'center', color: overlap ? '#E2006A' : '#4F6C92',
    fontFamily: 'Poppins-SemiBold', fontSize: 15}),
    place2: {paddingLeft: 15, color: '#A4B8D3', fontFamily: 'Poppins-Medium', fontSize: 16},
    buttonTouch: (booked, disabled, overlap) => ({position: 'absolute', alignSelf: 'center', right: 20, borderWidth: .5,
    borderColor: booked && disabled ? '#CBD2E1' : overlap ? '#CBD2E1' : booked ? '#FE93B3' : '#55CB82', borderRadius: 23,
    paddingHorizontal: 15, paddingVertical: 3}),
    buttonTouch2: (disabled) => ({position: 'absolute', alignSelf: 'center', right: 30, borderWidth: .5,
    borderColor: disabled ? '#CBD2E1' : '#FE93B3', borderRadius: 23, paddingHorizontal: 15, paddingVertical: 7}),
    buttonText: (booked, disabled, overlap) => ({color: booked && disabled ? '#A4B8D3' : overlap ? '#A4B8D3' :
    booked ? '#E2006A' : '#16A64D', fontFamily: 'Poppins-Medium', fontSize: 16}),
    buttonText2: (disabled) => ({color: disabled ? '#A4B8D3' : '#E2006A', fontFamily: 'Poppins-Medium', fontSize: 16}),
    emptyList: {paddingVertical: 10, fontFamily: 'Poppins-Medium', fontSize: 10, alignSelf: 'center', color: '#A4B8D3'}
})

export default RenderList

