/**
 *
 * Copyright 2015-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { StackNavigator, TabNavigator } from 'react-navigation';
import '../utils/StorageUtil' 
import Splash from '../pages/Splash';
import ActivityContainer from '../containers/ActivityContainer';
import MessageContainer from '../containers/MessageContainer';
import ChatContainer from '../containers/ChatContainer';
import PersonContainer from '../containers/PersonContainer';
import Create from '../pages/activity/Create';
import Login from '../pages/Login';
import Detail from '../pages/activity/Detail';
import PartyInfo from '../pages/person/PartyInfo';
import PartyFee from '../pages/person/PartyFee';
import Party from '../pages/person/Party';
import PersonInfo from '../pages/person/PersonInfo'


const TabContainer = TabNavigator(
  {
    Activity: { screen: ActivityContainer },
    Message: { screen: MessageContainer },
    Chat: { screen: ChatContainer },
    Person: { screen: PersonContainer }
  },
  {
    tabBarPosition:'bottom',
    tabBarOptions:{
      activeTintColor: 'red', 
      inactiveTintColor: 'black', 
      showIcon:true,
      style: {
        height:55,
        backgroundColor: 'white',
      },
      labelStyle: {
        fontSize: 10,
      },
    }
  }
);

const App = StackNavigator(
  {
    Splash: { screen: Splash },
    Home: {
      screen: TabContainer,
      navigationOptions: {
        headerLeft: null
      }
    },
    Create: {
      screen : Create,
      navigationOptions: {
        title: '活动创建',
      }
    },
    Detail:{screen:Detail},
    Login: {
      screen : Login,
      navigationOptions: {
        header: null,
      }
    },
    PartyInfo:{
      screen:PartyInfo,
      navigationOptions: {
        title: '革命战友',
      }
    },
    PartyFee:{
      screen:PartyFee,
      navigationOptions: {
        title: '缴纳党费',
      }  
    },
    Party:{
      screen:Party,
      navigationOptions: {
        title: '组织关系',
      }  
    },
    PersonInfo:{
      screen:PersonInfo,
      navigationOptions: {
        title: '基本信息',
      }  
    },
  },
  {
    initialRouteName:'Splash',
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3e9ce9'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20
      },
      headerTintColor: '#fff'
    }
  }
);

export default App;
