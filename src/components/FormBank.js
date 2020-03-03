import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Form, Item, Input, Label, Toast, Icon
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class FormBank extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameBank                    : '',
            nameUser                    : '',
            numAcc                      : '',
            money                       : '',
            photo                       : '',
            nameBankStatus              : 0,
            nameUserStatus              : 0,
            numAccStatus                : 0,
            moneyStatus                 : 0,
            photoStatus                 : 0,
            eventImg                    : i18n.translate('receipt'),
            base64                      : ''
        }
    }

    activeInput(type) {

        if (type === 'nameBank' || this.state.nameBank !== '') {
            this.setState({nameBankStatus: 1})
        }

        if (type === 'nameUser' || this.state.nameUser !== '') {
            this.setState({nameUserStatus: 1})
        }

        if (type === 'numAcc' || this.state.numAcc !== '') {
            this.setState({numAccStatus: 1})
        }

        if (type === 'money' || this.state.money !== '') {
            this.setState({moneyStatus: 1})
        }

        if (type === 'photo' || this.state.photo !== '') {
            this.setState({photoStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'nameBank' && this.state.nameBank === '') {
            this.setState({nameBankStatus: 0})
        }

        if (type === 'nameUser' && this.state.nameUser === '') {
            this.setState({nameUserStatus: 0})
        }

        if (type === 'numAcc' && this.state.numAcc === '') {
            this.setState({numAccStatus: 0})
        }

        if (type === 'money' && this.state.money === '') {
            this.setState({moneyStatus: 0})
        }

        if (type === 'photo' && this.state.photo === '') {
            this.setState({photoStatus: 0})
        }

    }

    validate = () => {
        let isError     = false;
        let msg         = '';

        if (this.state.nameBank === '') {
            isError     = true;
            msg         = i18n.t('enterbank');
        } else if (this.state.nameUser === '') {
            isError     = true;
            msg         = i18n.t('enterowner');
        } else if (this.state.numAcc === '') {
            isError     = true;
            msg         = i18n.t('enternumber');
        } else if (this.state.money === '') {
            isError     = true;
            msg         = i18n.t('enteramount');
        } else if (this.state.base64 === '') {
            isError     = true;
            msg         = i18n.t('enterpicture');
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
            this.props.navigation.navigate('BankAccounts');
        }

    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    _pickImage = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        if (!result.cancelled) {
            this.setState({ eventImg: result.uri ,base64:result.base64});
        }
    };

    componentWillMount() {

        this.setState({spinner: true});

    }

    render() {

        return (
            <Container>

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Image style={[styles.headImage]} source={require('../../assets/img/left.png')} resizeMode={'contain'}/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_red, styles.textSize_16, styles.textLeft, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                            { i18n.t('thebank') }
                        </Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0, styles.zIndexDown ]}/>

                    <View style={[ styles.position_R, styles.zIndex, styles.bgFullWidth]}>

                        <View style={[  styles.marginHorizontal_10, styles.marginVertical_20,]}>
                            <View style={[ styles.marginVertical_10, styles.marginHorizontal_15, styles.Border, styles.border_gray]}>
                                <View style={[ styles.bg_White, styles.paddingHorizontal_15, styles.SelfLeft, styles.Width_100 ]}>
                                    <View style={[ styles.overHidden ]}>
                                        <Image style={[styles.icImg]} source={require('../../assets/img/sadad_logo.png')} resizeMode={'contain'}/>
                                    </View>
                                    <View style={[ styles.overHidden, styles.marginHorizontal_10 ]}>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_black_gray]}>{ i18n.t('namebank') }</Text>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_black_gray, styles.marginHorizontal_5]}>:</Text>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_black_gray]}>الراجحي</Text>
                                        </View>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_black_gray]}>{ i18n.t('accNum') }</Text>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_black_gray, styles.marginHorizontal_5]}>:</Text>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_black_gray]}>010000</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <Form style={styles.formControlLabel}>

                            <KeyboardAvoidingView behavior={'padding'}>

                                <Form style={[styles.flexCenter, styles.Width_90]}>

                                    <View style={[styles.position_R, styles.overHidden, styles.flexCenter]}>

                                        <View>
                                            <Text style={[styles.label , styles.textRegular , styles.text_black, styles.textSize_14, styles.position_A, styles.left_0 , styles.bg_White, styles.paddingVertical_5, styles.paddingHorizontal_10 ,(this.state.nameBankStatus === 1 ? { top : 2 , zIndex : 99 } : { top : 25 , zIndex : -1 })]}>{i18n.translate('transferred')}</Text>
                                            <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                                <Input
                                                    style={[styles.input, styles.height_50, (this.state.nameBankStatus === 1 ? styles.Active : styles.noActive)]}
                                                    onChangeText={(nameBank) => this.setState({nameBank})}
                                                    onBlur={() => this.unActiveInput('nameBank')}
                                                    onFocus={() => this.activeInput('nameBank')}
                                                />
                                            </Item>
                                        </View>

                                        <View>
                                            <Text style={[styles.label , styles.textRegular , styles.text_black, styles.textSize_14, styles.position_A, styles.left_0 , styles.bg_White, styles.paddingVertical_5, styles.paddingHorizontal_10 ,(this.state.nameUserStatus === 1 ? { top : 2 , zIndex : 99 } : { top : 25 , zIndex : -1 })]}>
                                                {i18n.translate('Holder')}
                                            </Text>
                                            <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                                <Input
                                                    style={[styles.input, styles.height_50, (this.state.nameUserStatus === 1 ? styles.Active : styles.noActive)]}
                                                    onChangeText={(nameUser) => this.setState({nameUser})}
                                                    onBlur={() => this.unActiveInput('nameUser')}
                                                    onFocus={() => this.activeInput('nameUser')}
                                                />
                                            </Item>
                                        </View>

                                        <View>
                                            <Text style={[styles.label , styles.textRegular , styles.text_black, styles.textSize_14, styles.position_A, styles.left_0 , styles.bg_White, styles.paddingVertical_5, styles.paddingHorizontal_10 ,(this.state.numAccStatus === 1 ? { top : 2 , zIndex : 99 } : { top : 25 , zIndex : -1 })]}>
                                                {i18n.translate('acountnumber')}
                                            </Text>
                                            <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                                <Input
                                                    style={[styles.input, styles.height_50, (this.state.numAccStatus === 1 ? styles.Active : styles.noActive)]}
                                                    onChangeText={(numAcc) => this.setState({numAcc})}
                                                    onBlur={() => this.unActiveInput('numAcc')}
                                                    onFocus={() => this.activeInput('numAcc')}
                                                />
                                            </Item>
                                        </View>

                                        <View>
                                            <Text style={[styles.label , styles.textRegular , styles.text_black, styles.textSize_14, styles.position_A, styles.left_0 , styles.bg_White, styles.paddingVertical_5, styles.paddingHorizontal_10 ,(this.state.moneyStatus === 1 ? { top : 2 , zIndex : 99 } : { top : 25 , zIndex : -1 })]}>
                                                {i18n.translate('bepaid')}
                                            </Text>
                                            <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                                <Input
                                                    style={[styles.input, styles.height_50, (this.state.moneyStatus === 1 ? styles.Active : styles.noActive)]}
                                                    onChangeText={(money) => this.setState({money})}
                                                    onBlur={() => this.unActiveInput('money')}
                                                    onFocus={() => this.activeInput('money')}
                                                />
                                            </Item>
                                        </View>

                                    </View>
                                    <View style={[ styles.rowGroup, styles.Width_100, styles.marginVertical_10 ]}>
                                        <Text style={[styles.label , styles.textRegular , styles.text_black, styles.textSize_14, ]}>
                                            {i18n.translate('receipt')}
                                        </Text>
                                        <TouchableOpacity
                                            style={[ styles.flex_60 , styles.rowGroup, styles.Border, styles.border_gray, styles.paddingHorizontal_10, styles.paddingVertical_10 ]}
                                            onPress={this._pickImage}>
                                            <Text style={[styles.label , styles.textRegular , styles.text_black_gray, styles.textSize_14, styles.width_100]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                { this.state.eventImg }
                                            </Text>
                                            <Icon style={[styles.textSize_20, styles.text_black_gray]} type="Feather" name='camera' />
                                        </TouchableOpacity>
                                    </View>
                                </Form>

                                <TouchableOpacity
                                    style={[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40]}
                                    onPress={() => this.onLoginPressed()}>
                                    <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                        {i18n.translate('confirm')}
                                    </Text>
                                </TouchableOpacity>

                            </KeyboardAvoidingView>

                        </Form>

                    </View>

                </Content>

            </Container>

        );
    }
}

export default FormBank;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
