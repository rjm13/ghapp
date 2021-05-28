//expandable items for the drawer menu

import * as React from 'react';
import {
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Platform,
  } from 'react-native';

  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ExpandableItemComponent extends React.Component {
    //Custom Component for the Expandable List
    constructor() {
      super();
      this.state = {
        layoutHeight: 0,
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.item.isExpanded) {
        this.setState(() => {
          return {
            layoutHeight: null,
          };
        });
      } else {
        this.setState(() => {
          return {
            layoutHeight: 0,
          };
        });
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.layoutHeight !== nextState.layoutHeight) {
        return true;
      }
      return false;
    }
  
    render() {
        const context = this;
      return (
        <View>
          {/*Header of the Expandable List Item*/}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.onClickFunction}
            style={styles.header}>
            <View style={styles.button}>
                <Icon 
                    style={styles.icons} 
                    name={this.props.item.icon} 
                    size={22}
                />
                
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: this.state.layoutHeight,
              overflow: 'hidden',
            }}>
            {/*Content under the header of the Expandable List Item*/}
            {this.props.item.subcategory.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={styles.content}
                onPress={() => context.props.navObj.navigate(item.name)}>
                <Text style={styles.text}>
                  {item.val}
                </Text>
                <View style={styles.separator} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  }
export default class ExpandableViewSeparate extends React.Component {
    //Main View defined under this Class
    constructor() {
      super();
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      this.state = { listDataSource: CONTENT };
    }
  
    updateLayout = index => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const array = [...this.state.listDataSource];
      array[index]['isExpanded'] = !array[index]['isExpanded'];
      this.setState(() => {
        return {
          listDataSource: array,
        };
      });
    };
  
    render() {
      return (
        <View style={styles.container}>
          <ScrollView>
            {this.state.listDataSource.map((item, key) => (
              <ExpandableItemComponent
                key={item.category_name}
                onClickFunction={this.updateLayout.bind(this, key)}
                item={item}
                navObj={this.props.navObj}
              />
            ))}
          </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    topHeading: {
      paddingLeft: 10,
      fontSize: 20,
    },
    icons: {
        color: '#5e5e5e',
        paddingRight: 32,
        alignSelf: 'center',
    },
    button: {
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 0,
        alignSelf: 'flex-start',
        paddingLeft: 5,
    },
    header: {
      backgroundColor: '#fff',
      padding: 16,
    },
    headerText: {
      fontSize: 16,
      fontFamily: 'chalkboard-regular',
      color: '#5e5e5e',
    },
    separator: {
      height: 0,
      backgroundColor: '#808080',
      width: '95%',
      marginLeft: 16,
      marginRight: 16,
    },
    text: {
      fontSize: 16,
      color: '#606070',
      padding: 10,
      fontFamily: 'chalkboard-light',
    },
    content: {
      paddingLeft: 30,
      paddingRight: 10,
      backgroundColor: '#ededed',
      paddingVertical: 4,
      //paddingBottom: 10,
    },
  });
  
  //You can also use dynamic data by calling webservice
  const CONTENT = [
    {
      isExpanded: false,
      category_name: 'Games',
      icon: 'cards-playing-outline',
      subcategory: [{ id: 1, val: 'Discover', name: 'Home' },{ id: 2, val: 'Favorites' }, { id: 3, val: 'Add new' }],
    },
    {
      isExpanded: false,
      category_name: 'Scorecards',
      icon: 'grid',
      subcategory: [{ id: 4, val: 'New' }, { id: 5, val: 'Active' }, { id: 6, val: 'Presets' }, { id: 7, val: 'Framed' }],
    },
  ];