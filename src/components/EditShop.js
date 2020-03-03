import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Right, Icon, Form, Item, Input, CheckBox, Toast,Textarea
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class EditShop extends Component {
    constructor(props){
        super(props);
        this.state = {
            name                        : 'شعوذه الندم',
            info                        : 'هذا النص هو مثال لنص آخر يصعب الندم عليه',
            nameStatus                  : 1,
            infoStatus                  : 1,
            cityName                    : 'المنصوره - السنبلاوين - شارع المعيـز',
            userImage                   : '../../assets/img/girl.png',
            latitude                    : 11.11,
            longitude                   : 11.11,
            base64                      : ''
        }
    }

    activeInput(type) {

        if (type === 'name' || this.state.name !== '') {
            this.setState({nameStatus: 1})
        }

        if (type === 'info' || this.state.info !== '') {
            this.setState({infoStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'name' && this.state.name === '') {
            this.setState({nameStatus: 0})
        }

        if (type === 'info' && this.state.info === '') {
            this.setState({infoStatus: 0})
        }

    }

    validate = () => {
        let isError     = false;
        let msg         = '';

        if (this.state.name.length <= 0) {
            isError     = true;
            msg         = i18n.t('Full');
        } else if (this.state.info.length <= 0) {
            isError     = true;
            msg         = i18n.t('info');
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
                            { i18n.t('editstore') }
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

                    <View style={[ styles.position_R, styles.zIndex, styles.Width_100 , styles.paddingVertical_10]}>

                        <View style={[ styles.position_R, styles.Width_70]}>
                            <View style={[ styles.position_A, styles.top_10, styles.left_0, styles.overlay_black, styles.height_full, styles.zIndexDown, { width : '103%' } ]} />
                            <View style={[ styles.position_R, styles.overHidden,styles.Width_100, styles.height_200, styles.flexCenter, styles.overlay_black ]}>
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

                                <View style={[styles.position_R, styles.height_100, styles.marginVertical_10, styles.Width_100]}>
                                    <Textarea
                                        placeholder         = {i18n.t('massmtger')}
                                        style               = {[styles.textArea, styles.height_100, styles.paddingVertical_10, styles.bg_White, styles.Border, styles.Width_100,  (this.state.infoStatus === 1 ? styles.border_red : styles.border_light_gray)]}
                                        onChangeText        = {(info) => this.setState({info})}
                                        onBlur              = {() => this.unActiveInput('info')}
                                        onFocus             = {() => this.activeInput('info')}
                                        value               = {this.state.info}
                                    />
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

export default EditShop;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
