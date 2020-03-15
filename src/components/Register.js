import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView} from "react-native";
import {Container, Content, Form, Input, Item, Toast, Icon, CheckBox} from 'native-base'
import styles from '../../assets/style';
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from "react-navigation";
import Modal from "react-native-modal";
import DateTimePicker from "react-native-modal-datetime-picker";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name                        : '',
            phone                       : '',
            birthday                    : '',
            qualification               : '',
            password                    : '',
            confirmPassword             : '',
            deviceId                    : '',
            date                        : '',
            country                     : i18n.t('choosecity'),
            countryId                   : null,
            nationality                 : i18n.t('enternationality'),
            nationalityId               : null,
            userId                      : null,
            type                        : 0,
            nameStatus                  : 0,
            phoneStatus                 : 0,
            birthdayStatus              : 0,
            qualificationStatus         : 0,
            nationalityStatus           : 0,
            passwordStatus              : 0,
            confirmPasswordStatus       : 0,
            isDatePickerVisible         : false,
            spinner                     : false,
            checkTerms                  : false,
            isModalCountry              : false,
            isModalNationality          : false,
            cityName                    : i18n.translate('mapname'),
            latitude                    : null,
            longitude                   : null,
            userType                    :this.props.navigation.state.params.userType
        }
    }

    activeInput(type) {

        if (type === 'name' || this.state.name !== '') {
            this.setState({nameStatus: 1})
        }

        if (type === 'phone' || this.state.phone !== '') {
            this.setState({phoneStatus: 1})
        }

        if (type === 'birthday' || this.state.birthday !== '') {
            this.setState({birthdayStatus: 1})
        }

        if (type === 'qualification' || this.state.qualification !== '') {
            this.setState({qualificationStatus: 1})
        }

        if (type === 'nationality' || this.state.nationality !== '') {
            this.setState({nationalityStatus: 1})
        }

        if (type === 'password' || this.state.password !== '') {
            this.setState({passwordStatus: 1})
        }

        if (type === 'confirmPassword' || this.state.confirmPassword !== '') {
            this.setState({confirmPasswordStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'name' && this.state.name === '') {
            this.setState({nameStatus: 0})
        }

        if (type === 'phone' && this.state.phone === '') {
            this.setState({phoneStatus: 0})
        }

        if (type === 'birthday' && this.state.birthday === '') {
            this.setState({birthdayStatus: 0})
        }

        if (type === 'qualification' && this.state.qualification === '') {
            this.setState({qualificationStatus: 0})
        }

        if (type === 'nationality' && this.state.nationality === '') {
            this.setState({nationalityStatus: 0})
        }

        if (type === 'password' && this.state.password === '') {
            this.setState({passwordStatus: 0})
        }

        if (type === 'confirmPassword' && this.state.confirmPassword === '') {
            this.setState({confirmPasswordStatus: 0})
        }

    }

    validate = () => {
        let isError     = false;
        let msg         = '';

        if (this.state.name.length <= 0) {
            isError     = true;
            msg         = i18n.t('Full');
        } else if (this.state.phone.length <= 0) {
            isError     = true;
            msg         = i18n.t('namereq');
        } else if (this.state.date === '' || this.state.date === null) {
            isError     = true;
            msg         = i18n.t('enterbirthday');
        } else if (this.state.qualification.length <= 0) {
            isError     = true;
            msg         = i18n.t('enterqualification');
        } else if (this.state.nationalityId === null) {
            isError     = true;
            msg         = i18n.t('enternationality');
        }else if (this.state.countryId === null){
            isError     = true;
            msg         = i18n.translate('choosecity');
        } else if (this.state.password.length < 6){
            isError     = true;
            msg         = i18n.translate('passreq');
        } else if (this.state.password !== this.state.confirmPassword){
            isError     = true;
            msg         = i18n.translate('notmatch');
        } else if (this.state.checked === false) {
            isError = true;
            msg = i18n.translate('aggreTerms');
        }
        if (msg !== '') {
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle       : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center',
                }
            });
        }
        return isError;
    };

    onLoginPressed() {

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){
            this.props.navigation.navigate('ActivtionAccount');
        }
    }

    toggleDatePicker = () => {
        this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible });
    };

    doneDatePicker = date => {
        let formatted_date = date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0" +date.getDate()).slice(-2);
        this.setState({ date : formatted_date, isDatePickerVisible: false });
    };

    toggleModalCountry = () => {
        this.setState({ isModalCountry: !this.state.isModalCountry});
    };

    selectCountryId(id, name) {
        this.setState({
            countryId    : id,
            country      : name
        });
        this.setState({ isModalCountry: !this.state.isModalCountry});
    }

    toggleModalNationality = () => {
        this.setState({ isModalNationality: !this.state.isModalNationality});
    };

    selectNationalityId(id, name) {
        this.setState({
            nationalityId       : id,
            nationality         : name
        });
        this.setState({ isModalNationality: !this.state.isModalNationality});
    }

    async componentWillMount() {


    }

    getLocation(){

        this.props.navigation.navigate('MapLocation', {
            pageName : this.props.navigation.state.routeName
        });

    }

    componentWillReceiveProps(nextProps) {

        if( nextProps.navigation.state.params !== undefined ||  nextProps.navigation.state.params  !== undefined){
            this.state.cityName             = nextProps.navigation.state.params.city_name;
            this.setState({latitude   : nextProps.navigation.state.params.latitude});
            this.setState({longitude  : nextProps.navigation.state.params.longitude});
        }else{
            this.setState({cityName  : i18n.translate('mapname')});
        }

        this.setState({ isModalFilter   : !this.state.isModalFilter});

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (

            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Content contentContainerStyle={styles.bgFullWidth}>
                    <View style={[styles.position_R, styles.bgFullWidth, styles.marginVertical_15, styles.flexCenter, styles.Width_100]}>
                        <View style={[styles.overHidden, styles.marginVertical_15]}>
                            <Animatable.View animation="bounceIn" easing="ease-out" delay={500} style={[styles.flexCenter]}>
                                <Image style={[styles.icoImage]} source={require('../../assets/img/icon.png')}/>
                            </Animatable.View>
                        </View>
                        <KeyboardAvoidingView behavior={'padding'}>
                            <Form style={[styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('userName')}
                                            style={[styles.input, styles.height_50, (this.state.nameStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(name) => this.setState({name})}
                                            onBlur={() => this.unActiveInput('name')}
                                            onFocus={() => this.activeInput('name')}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
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

                                <View style={[styles.overHidden, styles.rowGroup]}>
                                    <TouchableOpacity onPress={this.toggleDatePicker} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, (this.state.date !== '' ? styles.border_red :  styles.border_gray )]}>
                                        <Text style={[styles.textRegular, styles.textSize_14, (this.state.date !== '' ? styles.text_red :  styles.text_black )]}>
                                            {i18n.translate('birthday')} : {this.state.date}
                                        </Text>
                                        <Icon style={[styles.textSize_20, styles.text_light_gray]} type="AntDesign" name='calendar' />
                                    </TouchableOpacity>
                                </View>

                                <DateTimePicker
                                    isVisible       = {this.state.isDatePickerVisible}
                                    onConfirm       = {this.doneDatePicker}
                                    onCancel        = {this.toggleDatePicker}
                                    mode            = {'date'}
                                    minimumDate     = {new Date()}
                                />

                                <View style={[styles.overHidden, styles.rowGroup]}>
                                    <TouchableOpacity onPress={() => this.toggleModalNationality()} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, (this.state.nationalityId !== null ? styles.border_red :  styles.border_gray )]}>
                                        <Text style={[styles.textRegular, styles.textSize_14, (this.state.nationalityId !== null ? styles.text_red :  styles.text_black )]}>
                                            { this.state.nationality }
                                        </Text>
                                        <Icon style={[styles.textSize_20, styles.text_light_gray]} type="AntDesign" name='down' />
                                    </TouchableOpacity>
                                </View>

                                <Modal isVisible={this.state.isModalNationality} onBackdropPress={() => this.toggleModalNationality()}>
                                    <View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>

                                        <View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                                                {i18n.t('enternationality')}
                                            </Text>
                                        </View>

                                        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                            <TouchableOpacity
                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                onPress             = {() => this.selectNationalityId(1, 'ذكر')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.nationalityId === 1}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        ذكر
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                onPress             = {() => this.selectNationalityId(2, 'إنثي')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.nationalityId === 2}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        إنثي
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </Modal>

                                <View style={[styles.overHidden, styles.rowGroup]}>
                                    <TouchableOpacity onPress={() => this.toggleModalCountry()} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border,  (this.state.countryId !== null ? styles.border_red :  styles.border_gray )]}>
                                        <Text style={[styles.textRegular, styles.textSize_14, (this.state.countryId !== null ? styles.text_red :  styles.text_black )]}>
                                            { this.state.country }
                                        </Text>
                                        <Icon style={[styles.textSize_20, styles.text_light_gray]} type="AntDesign" name='down' />
                                    </TouchableOpacity>
                                </View>

                                <Modal isVisible={this.state.isModalCountry} onBackdropPress={() => this.toggleModalCountry()}>
                                    <View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>

                                        <View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                                                {i18n.t('choosecity')}
                                            </Text>
                                        </View>

                                        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                            <TouchableOpacity
                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                onPress             = {() => this.selectCountryId(1, 'الرياض')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.countryId === 1}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        الرياض
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                onPress             = {() => this.selectCountryId(2, 'السعوديه')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.countryId === 2}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        السعوديه
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                onPress             = {() => this.selectCountryId(3, 'مصر')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.countryId === 3}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        مصر
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </Modal>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('qualification')}
                                            style={[styles.input, styles.height_50, (this.state.qualificationStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(qualification) => this.setState({qualification})}
                                            onBlur={() => this.unActiveInput('qualification')}
                                            onFocus={() => this.activeInput('qualification')}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.overHidden, styles.rowGroup]}>
                                    <TouchableOpacity
                                        style       = {[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, (this.state.latitude !== null ||  this.state.longitude !== null ? styles.border_red : styles.border_gray)]}
                                        onPress     = {() => this.getLocation()}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.width_150, (this.state.latitude !== null ||  this.state.longitude !== null ? styles.text_red : styles.text_black)]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                            {this.state.cityName}
                                        </Text>
                                        <Icon style={[styles.textSize_20, styles.text_light_gray]} type="Feather" name='map-pin' />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
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

                                <View
                                    style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('confirmPassword')}
                                            style={[styles.input, styles.height_50, (this.state.confirmPasswordStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                                            onBlur={() => this.unActiveInput('confirmPassword')}
                                            onFocus={() => this.activeInput('confirmPassword')}
                                            secureTextEntry
                                        />
                                    </Item>
                                </View>

                                {
                                    this.state.userType === 'chef' ?
										<View style={[ styles.height_40 ]}>
											<ScrollView style={[ styles.scroll ]} horizontal={true} showsHorizontalScrollIndicator={false}>

												<TouchableOpacity
													onPress         = {() => this.onSubCategories(1)}
													style           = {[ styles.paddingHorizontal_25, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, ( this.state.active === 1  ? styles.bg_black : styles.bg_gray ) ]}>
													<Text style     = {[ styles.textRegular, styles.textSize_12 , ( this.state.active === 1 ? styles.text_White : styles.text_black_gray )]} >
														إستلام من الشيف
													</Text>
												</TouchableOpacity>
												<TouchableOpacity
													onPress         = {() => this.onSubCategories(2)}
													style           = {[ styles.paddingHorizontal_25, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, ( this.state.active === 2  ? styles.bg_black : styles.bg_gray ) ]}>
													<Text style     = {[ styles.textRegular, styles.textSize_12 , ( this.state.active === 2 ? styles.text_White : styles.text_black_gray )]} >
														علي حسب المسافه
													</Text>
												</TouchableOpacity>
												<TouchableOpacity
													onPress         = {() => this.onSubCategories(3)}
													style           = {[ styles.paddingHorizontal_25, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, ( this.state.active === 3  ? styles.bg_black : styles.bg_gray ) ]}>
													<Text style     = {[ styles.textRegular, styles.textSize_12  , ( this.state.active === 3 ? styles.text_White : styles.text_black_gray )]} >
														مجانيه
													</Text>
												</TouchableOpacity>

											</ScrollView>
										</View> : null
                                }

                                <View style={[styles.rowRight, styles.marginVertical_20]}>
                                    <TouchableOpacity style={[styles.rowRight, styles.marginVertical_10]}>
                                        <CheckBox
                                            style={[styles.checkBox, styles.Border, styles.bg_red, styles.Border, styles.border_red]}
                                            color={styles.text_gray}
                                            selectedColor={styles.text_White}
                                            onPress={() => this.setState({checkTerms: !this.state.checkTerms})}
                                            checked={this.state.checkTerms}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms')}>
                                        <Text
                                            style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.paddingHorizontal_15, styles.textDecoration]}>
                                            {i18n.t('agreTe')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40]}
                                    onPress={() => this.onLoginPressed()}>
                                    <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                        {i18n.translate('doHaveAcc')}
                                    </Text>
                                </TouchableOpacity>

                            </Form>
                        </KeyboardAvoidingView>
                        <TouchableOpacity
                            onPress         = {() => this.props.navigation.navigate('Login')}
                            style           = {[styles.marginVertical_10, styles.flexCenter, styles.zIndex]}>
                            <Text style     = {[styles.textRegular, styles.textSize_14, styles.text_red]}>
                                {i18n.translate('login')}
                            </Text>
                        </TouchableOpacity>
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

export default Register;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         loading     : auth.loading,
//         auth        : auth.user,
//         user        : profile.user,
//         lang        : lang.lang
//     };
// };
// export default connect(mapStateToProps, {  })(Login);
