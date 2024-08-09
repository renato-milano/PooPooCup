import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants'
import Banner from '../../components/Banner'

const TabIcon= ({icon,color,name,focused}) =>{
    return(
        <View className="items-center justify-center gap-1">
            <Image source={icon}
            resizeMode='contain'
            tintColor={color}
            className="w-6 h-6"/>
            <Text className={`${focused ? 'font-bsemibold' : 'font-bregular'} tex-xs`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
<>
<Banner></Banner>
<Tabs
className=""
screenOptions={{
    tabBarShowLabel: false,
    headerShown: false,
    tabBarActiveTintColor: '#D5BDAF',
    tabBarInactiveTintColor: '#BC8A5F',
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        lazyLoad: true,
        style: {
            backgroundColor:'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            elevation: 0  // <-- this is the solution
          },
      }
}
}>
    <Tabs.Screen 
    name='home' 
    options= {{
        title:'Home',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
            <TabIcon
            icon={icons.home}
            color={color}
            name="Home"
            focused={focused}
            ></TabIcon>
        )
        }}>

    </Tabs.Screen>

    <Tabs.Screen 
    name='explore' 
    options= {{
        title:'explore',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
            <TabIcon
            icon={icons.bookmark}
            color={color}
            name="Le mie Leghe"
            focused={focused}
            ></TabIcon>
        )
        }}>

    </Tabs.Screen>
    <Tabs.Screen 
    name='profile' 
    options= {{
        title:'profile',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
            <TabIcon
            icon={icons.profile}
            color={color}
            name="Profilo"
            focused={focused}
            ></TabIcon>
        )
        }}>

    </Tabs.Screen>
</Tabs>
</>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})