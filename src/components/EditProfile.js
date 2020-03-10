import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Right, Icon, Form, Item, Input, CheckBox, Toast,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DateTimePicker from "react-native-modal-datetime-picker";

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            name                        : 'شعوذه الندم',
            phone                       : '01001846667',
            qualification               : '',
            country                     : 'السنبلاوين',
            countryId                   : 1,
            nationality                 : 'ذكر',
            nationalityId               : 1,
            userId                      : null,
            type                        : 0,
            nameStatus                  : 1,
            phoneStatus                 : 1,
            spinner                     : false,
            isModalCountry              : false,
            isModalNationality          : false,
            cityName                    : 'المنصوره - السنبلاوين - شارع المعيـز',
            userImage                   : '../../assets/img/girl.png',
            latitude                    : 11.11,
            longitude                   : 11.11,
            base64                      : '',
            active                      : 1,
        }
    }

    activeInput(type) {

        if (type === 'name' || this.state.name !== '') {
            this.setState({nameStatus: 1})
        }

        if (type === 'phone' || this.state.phone !== '') {
            this.setState({phoneStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'name' && this.state.name === '') {
            this.setState({nameStatus: 0})
        }

        if (type === 'phone' && this.state.phone === '') {
            this.setState({phoneStatus: 0})
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
        } else if (this.state.nationalityId === null) {
            isError     = true;
            msg         = i18n.t('enternationality');
        } else if (this.state.countryId === null){
            isError     = true;
            msg         = i18n.translate('choosecity');
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

    onEditPressed() {

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){
            this.props.navigation.navigate('Profile');
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
            checked2     : id,
            country     : name
        });
        this.state.countryId = id;
        this.setState({ isModalCountry: !this.state.isModalCountry});
    }

    toggleModalNationality = () => {
        this.setState({ isModalNationality: !this.state.isModalNationality});
    };

    selectNationalityId(id, name) {
        this.setState({
            checked        : id,
            nationality     : name
        });
        this.state.nationalityId = id;
        this.setState({ isModalNationality: !this.state.isModalNationality});
    }

    getLocation(){

        this.props.navigation.navigate('MapLocation', {
            pageName : this.props.navigation.state.routeName
        });

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
            this.setState({ userImage: result.uri ,base64:result.base64});
        }
    };

    onSubCategories ( id ){
        this.setState({spinner: true, active : id });
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

    componentWillMount() {

        this.setState({spinner: true});

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        let image = this.state.userImage;

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Image style={[styles.headImage]} source={require('../../assets/img/left.png')} resizeMode={'contain'}/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_red, styles.textSize_16, styles.textLeft, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                            { i18n.t('editAcc') }
                        </Title>
                    </Body>
                    <Right style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon type={'AntDesign'} name={'close'} style={[ styles.text_red, styles.textSize_26 ]}/>
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0, styles.zIndexDown ]}/>

                    <View style={[ styles.position_R, styles.zIndex, styles.bgFullWidth , styles.paddingVertical_10]}>

                        <View style={[ styles.position_R, styles.overHidden,styles.Width_85, styles.height_200, styles.flexCenter ]}>
                            <View style={[ styles.position_A, styles.top_0, styles.right_0, styles.overlay_black, styles.Width_100, styles.height_full, styles.zIndex ]} />
                            <TouchableOpacity
                                style={[styles.width_40, styles.height_40, styles.overlay_white, styles.flexCenter, styles.position_A, styles.left_0, styles.top_20, styles.zIndex]}
                                onPress={this._pickImage}
                            >
                                <Icon style={[styles.text_White, styles.textSize_20]} type="AntDesign" name='plus' />
                            </TouchableOpacity>
                            <View style={[ styles.overHidden,styles.Width_100, styles.height_200, styles.flexCenter, styles.position_R]}>
                                <Image style={[styles.Width_100, styles.height_200]} source={{ uri: image }} resizeMode={'cover'}/>
                            </View>
                        </View>

                        <View style={[ styles.marginVertical_10, styles.Width_85, styles.flexCenter ]}>

                            <Form style={[styles.flexCenter, styles.marginVertical_10, styles.Width_100]}>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('userName')}
                                            style={[styles.input, styles.height_50, (this.state.nameStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(name) => this.setState({name})}
                                            onBlur={() => this.unActiveInput('name')}
                                            onFocus= {() => this.activeInput('name')}
                                            value= {this.state.name}
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
                                            value= {this.state.phone}
                                        />
                                    </Item>
                                </View>

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
                                                        checked             = {this.state.checked === 1}
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
                                                        checked             = {this.state.checked === 2}
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
                                                        checked             = {this.state.checked2 === 1}
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
                                                        checked             = {this.state.checked2 === 2}
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
                                                        checked             = {this.state.checked === 3}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        مصر
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </Modal>

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
                                </View>

                            <TouchableOpacity
                                style       = {[ styles.marginVertical_25 , styles.width_150, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.flexCenter, styles.bg_red,]}
                                onPress     = {() => this.onEditPressed()}
                            >
                                <Text style={[styles.textRegular, styles.textSize_13, styles.text_White]}>
                                    { i18n.t('confirm') }
                                </Text>
                            </TouchableOpacity>

                        </Form>

                        </View>
                    </View>

                </Content>

            </Container>

        );
    }
}

export default EditProfile;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
