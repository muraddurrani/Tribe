import React from 'react'
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native'

export default function index() {
    return (
        <SafeAreaView>
            <View>
                <View>
                    <Image source= {require('../../../../assets/images/avatar.png')}/>
                    <View style={marginLeft=20}>
                        
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
