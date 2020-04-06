import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Input, Item, Toast,} from 'native-base'
import styles from '../../assets/style';
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from "react-navigation";
import {connect} from 'react-redux';
import {chooseLang, profile, userLogin} from '../actions'
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo'
import Spinner from "react-native-loading-spinner-overlay";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone               : '',
            password            : '',
            deviceId            : '',
            device_type         : 'ios',
            userId              : null,
            type                : 0,
            phoneStatus         : 0,
            passwordStatus      : 0,
            spinner             : false,
        }
    }

    activeInput(type) {

        if (type === 'phone' || this.state.phone !== '') {
            this.setState({phoneStatus: 1})
        }

        if (type === 'password' || this.state.password !== '') {
            this.setState({passwordStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'phone' && this.state.phone === '') {
            this.setState({phoneStatus: 0})
        }

        if (type === 'password' && this.state.password === '') {
            this.setState({passwordStatus: 0})
        }

    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        } else if (this.state.password.length <= 0) {
            isError = true;
            msg = i18n.t('pass');
        }
        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'cairo',
                    textAlign: 'center',
                }
            });
        }
        return isError;
    };

    renderSubmit() {
        if (this.state.password == '' || this.state.phone == '') {
            return (
                <TouchableOpacity
                    style={[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40 , {
                        backgroundColor:'#999'
                    }]}
                >
                    <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                        {i18n.translate('login')}
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40]}
                onPress={() => this.onLoginPressed()}>
                <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                    {i18n.translate('login')}
                </Text>
            </TouchableOpacity>
        );
    }

    onLoginPressed() {

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){
            const {phone, password, deviceId , device_type} = this.state;
            this.props.userLogin({ phone, password, deviceId:'11' , device_type}, this.props.lang);
        }

    }

    async componentWillMount() {

        const {status: existingStatus} = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        const deviceId = await Notifications.getExpoPushTokenAsync();

        this.setState({deviceId, userId: null});
        AsyncStorage.setItem('deviceID', deviceId);

    }

    componentWillReceiveProps(newProps) {

        console.log('props auth ...', newProps.auth);


        if (newProps.auth !== null && newProps.auth.success) {

            if (this.state.userId === null) {
                this.setState({userId: newProps.auth.data.id});
                this.props.profile(newProps.auth.data.token);
            }

            this.props.navigation.navigate('drawerNavigator');

        }

        if (newProps.auth !== null) {
            this.setState({spinner: false});
            Toast.show({
                text: newProps.auth.message,
                type: newProps.auth.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "#fff",
                    fontFamily: 'cairo',
                    textAlign: 'center',
                }
            });
        }

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (

            <Container>
                <Spinner
                    visible={this.state.spinner}
                />
                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Content contentContainerStyle={styles.bgFullWidth}>
                    <View style={[styles.position_R, styles.bgFullWidth, styles.marginVertical_30, styles.flexCenter, styles.Width_100, { marginTop: 100 }]}>
                        <View style={[styles.overHidden, styles.marginVertical_15]}>
                            <Animatable.View animation="bounceIn" easing="ease-out" delay={500} style={[styles.flexCenter]}>
                                    <Image style={[styles.icoImage]} source={require('../../assets/img/icon.png')}/>
                            </Animatable.View>
                        </View>
                        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                            <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <View
                                    style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('phone')}
                                            style={[styles.input, styles.height_50, (this.state.phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(phone) => this.setState({phone})}
                                            onBlur={() => this.unActiveInput('phone')}
                                            onFocus={() => this.activeInput('phone')}
                                            keyboardType={'number-pad'}
                                        />
                                    </Item>
                                </View>

                                <View
                                    style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('password')}
                                            style={[styles.input, styles.height_50, (this.state.passwordStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(password) => this.setState({password})}
                                            onBlur={() => this.unActiveInput('password')}
                                            onFocus={() => this.activeInput('password')}
                                            secureTextEntry
                                        />
                                    </Item>
                                </View>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')} style={[styles.marginVertical_5, styles.SelfRight]}>
                                    <Text style={[styles.textRegular, styles.textSize_14, styles.marginVertical_5, styles.light_gray]}>
                                        {i18n.translate('forgetPassword')}
                                    </Text>
                                </TouchableOpacity>

                                {this.renderSubmit()}

                            </Form>
                            <TouchableOpacity
                                onPress         = {() => this.props.navigation.navigate('ChooseUser')}
                                style           = {[styles.marginVertical_10, styles.flexCenter]}>
                                <Text style     = {[styles.textRegular, styles.textSize_14, styles.text_red]}>
                                    {i18n.translate('doHaveAcc')}
                                </Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                    <View style={[styles.shape_logo, styles.position_A, styles.fixItem, styles.zIndexDown]}>
                        <Animatable.View animation="fadeIn" easing="ease-out" delay={500}>
                                <Image style={[styles.shape_logo]} source={require('../../assets/img/shape.png')}/>
                        </Animatable.View>
                    </View>
                </Content>

            </Container>

        );
    }
}

const mapStateToProps = ({auth, profile, lang}) => {
    return {
        loading: auth.loading,
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {userLogin, profile, chooseLang})(Login);
