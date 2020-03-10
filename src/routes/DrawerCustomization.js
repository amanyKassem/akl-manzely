import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Share} from "react-native";
import {Button, Container, Content, Icon} from 'native-base';
import { DrawerItems } from 'react-navigation-drawer';

import styles from "../../assets/style";
import COLORS from '../../src/consts/colors'
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {logout, tempAuth, chooseLang} from "../actions";
import Profile from "../components/Profile";
import MyOrders from "../components/MyOrders";
import Offers from "../components/Offers";
import Favorite from "../components/Favorite";
import BankAccounts from "../components/BankAccounts";
import About from "../components/About";
import Faq from "../components/Faq";
import ShareApp from "../components/ShareApp";
import Terms from "../components/Terms";
import CallUs from "../components/CallUs";
import Setting from "../components/Setting";

class DrawerCustomization extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
        }
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:'dddddd'
                    // Platform.OS === 'ios'? 'https://apps.apple.com/us/app/reesh-ريش/id1490248883?ls=1' : 'https://play.google.com/store/apps/details?id=com.app.reesh',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    filterItems(item){
        if (this.props.user == null)
            return item.routeName !== 'Profile' && item.routeName !== 'MyOrders' && item.routeName !== 'Offers' && item.routeName !== 'Favorite' && item.routeName !== 'BankAccounts';
        else if(this.props.user.type === 'user' )
            return item.routeName !== 'BankAccounts' && item.routeName !== 'Credit' ;
        else if(this.props.user.type === 'provider' )
            return  item.routeName !== 'Offers' && item.routeName !== 'Favorite' ;
    }

    returnItems(){
        return this.props.items.filter((item) =>  this.filterItems(item) )
    }

    logout(){
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('Login');
        this.props.logout(this.props.user.token);
        this.props.tempAuth();
    }
    registerChef(){
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('Register', {userType:'chef'})
        this.props.logout(this.props.user.token);
        this.props.tempAuth();
    }

    render() {
        let { user } = this.props;
        if ( user == null )
            user = {
                avatar      : '../../assets/img/girl.png',
                name        : i18n.t('guest'),
            };

        return (
            <Container>
                <View style={[styles.bg_light_red, styles.width_50, styles.height_full, styles.position_A, styles.left_20, styles.top_0 , styles.zIndexDown]}/>
                <Content contentContainerStyle={styles.bgFullWidth}>


                    <TouchableOpacity
                        style       = {[styles.width_40 , styles.height_40 , styles.bg_light_red, styles.position_A, styles.centerContext, styles.top_30, styles.SelfRight]}
                        onPress     = {() => { this.props.navigation.closeDrawer()} }
                    >
                        <Icon style={[styles.text_red, styles.textSize_22]} type="AntDesign" name='close' />
                    </TouchableOpacity>

                    <View style={[styles.flexLeft]}>

                        <View style={[styles.flexLeft, styles.marginVertical_10]}>
                            <View style={[styles.bg_red, styles.width_150, styles.height_70, styles.position_A, styles.zIndexDown, styles.top_30]}/>
                            <TouchableOpacity style={[styles.position_R, styles.flexCenter, styles.Width_100, styles.marginHorizontal_25, styles.top_45]} onPress = {() => this.props.navigation.navigate('Profile')}>
                                {/*<Image style={[styles.width_90, styles.height_90, styles.Radius_5]} source={{ uri: user.avatar }}/>*/}
                                <Image style={[styles.width_90, styles.height_90, styles.Radius_5]} source={{uri:user.avatar}}/>
                                <View onPress={() => this.props.navigation.navigate('profile')}>
                                    <Text style={[styles.textRegular, styles.textSize_16, styles.text_red]}>{ user.name }</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={[styles.marginVertical_25]}>
                        <DrawerItems {...this.props}
                             onItemPress={
                                 (route) => {
                                     if (route.route.key === 'logout') {
                                         this.logout()
                                     }else {
                                         route.route.key === 'ShareApp' ? this.onShare(): this.props.navigation.navigate(route.route.key)
                                     }
                                 }
                             }

                             items                          = {this.returnItems()}
                             activeBackgroundColor          = {styles.bg_red}
                             inactiveBackgroundColor        = 'transparent'
                             activeLabelStyle               = {COLORS.red}
                             labelStyle                     = {styles.drawerLabel}
                             iconContainerStyle             = {styles.drawerIcon}
                             itemStyle                      = {[styles.drawerItemStyle]}
                             itemsContainerStyle            = {styles.marginVertical_10}
                        />

                        {
                            this.props.auth == null || this.props.user == null ?
                                <TouchableOpacity  onPress= {() => this.registerChef()} style={{ flexDirection: 'row', top: 0, marginLeft: 35 }}>
                                    <Image style={[styles.headImage]} source={require('../../assets/img/logout.png')} resizeMode={'contain'}/>
                                    <Text style={[styles.textRegular, styles.textSize_16, { marginLeft: 20 , top:-3 }]}>{ i18n.translate('AsChef') }</Text>
                                </TouchableOpacity>
                                : null
                        }

                    </View>

                </Content>

                {
                    (this.props.auth == null || this.props.user == null) ?

                        <TouchableOpacity style={[styles.bg_red, styles.position_A, styles.bottom_40, styles.right_0, styles.height_150, styles.width_40 ]} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={[styles.textRegular, styles.textSize_16, styles.text_White,styles.paddingVertical_5, styles.textCenter, { transform: [{ rotate: '90deg' }], width: 100, height: 90, top: 30 }]}>{i18n.translate('login')}</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={[styles.bg_red ,styles.position_A, styles.bottom_40, styles.right_0, styles.height_150, styles.width_40 ]} onPress={() => this.logout()}>
                            <Text style={[styles.textRegular, styles.textSize_16, styles.text_White,styles.paddingVertical_5, styles.textCenter, { transform: [{ rotate: '90deg' }], width: 100, height: 90, top: 30 }]}>{i18n.translate('logout')}</Text>
                        </TouchableOpacity>

                }

            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth    : auth.user,
        user    : profile.user
    };
};

export default connect(mapStateToProps, { logout, tempAuth, chooseLang })(DrawerCustomization);
