import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList, KeyboardAvoidingView} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Icon,
    Body,
    Right,
    Toast,
    Item,
    Input,
    Title,
    CheckBox, Form
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {getCategories , getProviderHome} from "../actions";
import COLORS from "../consts/colors";
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
const isIOS = Platform.OS === 'ios';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                 : false,
            isModalFilter           : false,
            isModalRate             : false,
            isModalSallery          : false,
            active                  : null,
            projects                : '',
            projects_string         : '',
            totalCases              : '',
            ActiveCases             : '',
            phone                   : '',
            rate                    : i18n.t('rate'),
            rateId                  : null,
            Sallery                 : i18n.t('price'),
            SalleryId               : null,
            checked                 : '',
            checked2                : '',
            cityName                : i18n.translate('mapname'),
            latitude                : null,
            longitude               : null
        }
    }

    activeInput(type) {

        if (type === 'phone' || this.state.phone !== '') {
            this.setState({phoneStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'phone' && this.state.phone === '') {
            this.setState({phoneStatus: 0})
        }

    }

    componentWillReceiveProps(nextProps) {

        if( nextProps.navigation.state.params !== undefined ||  nextProps.navigation.state.params  !== undefined){
            this.state.cityName             = nextProps.navigation.state.params.city_name;
            this.setState({latitude   : nextProps.navigation.state.params.latitude});
            this.setState({longitude  : nextProps.navigation.state.params.longitude});
        }else{
            this.setState({cityName  : i18n.translate('mapname')});
        }

        this.setState({ isModalFilter   : !this.state.isModalFilter , spinner : false});

    }

    getLocation(){

        this.props.navigation.navigate('MapLocation', {
            pageName : this.props.navigation.state.routeName
        });

        this.setState({ isModalFilter   : !this.state.isModalFilter});

    }

    onSearch(){

        this.props.navigation.navigate('FilterSearch', {
            pageName : this.props.navigation.state.routeName
        });

    }

    onSubCategories ( id ){
        this.setState({spinner: true, active : id });
        this.props.getProviderHome(this.props.lang , id , this.props.user.token)
    }

    toggleModalFilter = () => {
        this.setState({ isModalFilter   : !this.state.isModalFilter});
    };

    toggleModalRate = () => {
        this.setState({ isModalFilter   : !this.state.isModalFilter});
        this.setState({ isModalRate     : !this.state.isModalRate});
    };

    toggleModalSallery = () => {
        this.setState({ isModalSallery  : !this.state.isModalSallery});
        this.setState({ isModalFilter   : !this.state.isModalFilter});
    };

    selectRateId(id, name) {
        this.setState({
            rateId       : id,
            rate         : name
        });
        this.state.reteId = id;
        this.setState({ isModalRate     : !this.state.isModalRate});
        this.setState({ isModalFilter   : !this.state.isModalFilter});
    }

    selectSellaryId(id, name) {
        this.setState({
            SalleryId       : id,
            Sallery         : name
        });
        this.state.SalleId = id;
        this.setState({ isModalSallery  : !this.state.isModalSallery});
        this.setState({ isModalFilter   : !this.state.isModalFilter});
    }

    componentWillMount() {
        this.setState({spinner: true});
        this.props.getCategories(this.props.lang ,this.props.auth.data.type === 'provider'? null : 0);
        this.props.getProviderHome(this.props.lang , null , this.props.auth.data.token);
    }

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('home')}</Text>) ,
        drawerIcon      : (<Image style={[styles.headImage]} source={require('../../assets/img/home.png')} resizeMode={'contain'}/>)
    });

    onFocus(){
        this.componentWillMount();
    }
    render() {

        return (
            <Container>

                <Spinner visible = { this.state.spinner } />
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={[styles.headerView]}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => { this.props.navigation.openDrawer()} }>
                            <Image style={[styles.headImage]} source={require('../../assets/img/menu.png')} resizeMode={'contain'}/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        {
                            this.props.user == null || this.props.user.type !== 'provider'?
                                <View style={[styles.position_R, styles.SelfRight]}>
                                    <Item floatingLabel style={styles.item}>
                                        <Input
                                            placeholder={i18n.translate('searchCat')}
                                            style={[styles.input, styles.height_40, styles.BorderNone, styles.paddingRight_5, styles.paddingLeft_5 ,styles.textSize_14,styles.text_red, {backgroundColor : "#dcd8d8"}]}
                                            autoCapitalize='none'
                                            placeholderTextColor="#d8999a"
                                            onChangeText={(categorySearch) => this.setState({categorySearch})}
                                        />
                                    </Item>
                                    <TouchableOpacity
                                        style={[styles.position_A, styles.right_0, styles.width_50, styles.height_40, styles.flexCenter]}
                                        onPress={() => this.onSearch()}>
                                        <Image style={[styles.headImage]} source={require('../../assets/img/search.png')} resizeMode={'contain'}/>
                                    </TouchableOpacity>
                                </View>
                                :
                                <Title style={[styles.textRegular , styles.text_red, styles.textSize_16, styles.textLeft, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                                    { i18n.t('home') }
                                </Title>
                        }


                    </Body>
                    <Right style={styles.rightIcon}>
                        {
                            this.props.user || this.props.user.type !== 'provider'?
                                <Button style={styles.Button} transparent onPress={() => this.toggleModalFilter()}>
                                    <Image style={[styles.headImage]} source={require('../../assets/img/controls.png')} resizeMode={'contain'}/>
                                </Button>
                                :
                                null
                        }
                        <Button style={styles.Button} transparent onPress = {() => this.props.navigation.navigate('Notification')}>
                            <Image style={[styles.headImage]} source={require('../../assets/img/alarm.png')} resizeMode={'contain'}/>
                        </Button>
                        {
                            this.props.user == null ||this.props.user.type !== 'provider'?
                                <Button style={styles.Button} transparent onPress = {() => this.props.navigation.navigate('Cart')}>
                                    <Image style={[styles.headImage]} source={require('../../assets/img/shopping.png')} resizeMode={'contain'}/>
                                </Button>
                                :
                                null
                        }

                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    {/*<View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0 ]}/>*/}

                    {
                        this.props.user != null && this.props.user.type === 'user' ?
                            <View style={[styles.boxUser]}>

                                <Modal isVisible={this.state.isModalFilter}
                                       onBackdropPress={() => this.toggleModalFilter()}
                                       style={[styles.bottomCenter, styles.Width_100]}>
                                    <View
                                        style={[styles.overHidden, styles.bg_White, styles.flexCenter, styles.Width_100, styles.position_R, styles.top_20]}>

                                        <View style={[styles.paddingVertical_15]}>
                                            <Text
                                                style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textLeft, styles.SelfCenter]}>
                                                {i18n.t('searchchef')}
                                            </Text>
                                        </View>

                                        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                                            <Form
                                                style={[styles.Width_90, styles.marginVertical_10, styles.flexCenter]}>

                                                <Item floatingLabel
                                                      style={[styles.item, styles.position_R, styles.overHidden]}>
                                                    <Input
                                                        placeholder={i18n.translate('numchef')}
                                                        style={[styles.input, styles.height_50, (this.state.phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                                        onChangeText={(phone) => this.setState({phone})}
                                                        onBlur={() => this.unActiveInput('phone')}
                                                        onFocus={() => this.activeInput('phone')}
                                                        keyboardType={'number-pad'}
                                                    />
                                                </Item>

                                                <View style={[styles.overHidden, styles.rowGroup]}>
                                                    <TouchableOpacity onPress={() => this.toggleModalRate()}
                                                                      style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.paddingHorizontal_20, styles.paddingVertical_10, styles.rowGroup, styles.Border, (this.state.rateId !== null ? styles.border_red : styles.border_gray)]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.textSize_14, (this.state.rateId !== null ? styles.text_red : styles.text_black)]}>
                                                            {this.state.rate}
                                                        </Text>
                                                        <Icon style={[styles.textSize_20, styles.text_light_gray]}
                                                              type="AntDesign" name='down'/>
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={[styles.overHidden, styles.rowGroup]}>
                                                    <TouchableOpacity onPress={() => this.toggleModalSallery()}
                                                                      style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.paddingHorizontal_20, styles.paddingVertical_10, styles.rowGroup, styles.Border, (this.state.SalleryId !== null ? styles.border_red : styles.border_gray)]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.textSize_14, (this.state.SalleryId !== null ? styles.text_red : styles.text_black)]}>
                                                            {this.state.Sallery}
                                                        </Text>
                                                        <Icon style={[styles.textSize_20, styles.text_light_gray]}
                                                              type="AntDesign" name='down'/>
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={[styles.overHidden, styles.rowGroup]}>
                                                    <TouchableOpacity
                                                        style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.paddingHorizontal_20, styles.paddingVertical_10, styles.rowGroup, styles.Border, (this.state.latitude !== null || this.state.longitude !== null ? styles.border_red : styles.border_gray)]}
                                                        onPress={() => this.getLocation()}
                                                    >
                                                        <Text
                                                            style={[styles.textRegular, styles.textSize_14, styles.width_150, (this.state.latitude !== null || this.state.longitude !== null ? styles.text_red : styles.text_black)]}
                                                            numberOfLines={1} prop with ellipsizeMode="tail">
                                                            {this.state.cityName}
                                                        </Text>
                                                        <Icon style={[styles.textSize_20, styles.text_light_gray]}
                                                              type="Feather" name='map-pin'/>
                                                    </TouchableOpacity>
                                                </View>

                                                <TouchableOpacity
                                                    style={[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40]}
                                                    onPress={() => this.toggleModalFilter()}>
                                                    <Text
                                                        style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                                        {i18n.translate('search')}
                                                    </Text>
                                                </TouchableOpacity>

                                            </Form>

                                        </View>

                                    </View>
                                </Modal>

                                <Modal isVisible={this.state.isModalRate}
                                       onBackdropPress={() => this.toggleModalRate()}>
                                    <View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>

                                        <View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>
                                            <Text
                                                style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, styles.SelfCenter]}>
                                                {i18n.t('starrate')}
                                            </Text>
                                        </View>

                                        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                            <TouchableOpacity
                                                style={[styles.rowGroup, styles.marginVertical_10]}
                                                onPress={() => this.selectRateId(1, 'الآعلي تقييم')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style={[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color={styles.text_red}
                                                        selectedColor={styles.text_red}
                                                        checked={this.state.reteId === 1}
                                                    />
                                                    <Text
                                                        style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        الآعلي تقييم
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.rowGroup, styles.marginVertical_10]}
                                                onPress={() => this.selectRateId(2, 'الآقل تقييم')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style={[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color={styles.text_red}
                                                        selectedColor={styles.text_red}
                                                        checked={this.state.reteId === 2}
                                                    />
                                                    <Text
                                                        style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        الآقل تقييم
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </Modal>

                                <Modal isVisible={this.state.isModalSallery}
                                       onBackdropPress={() => this.toggleModalSallery()}>
                                    <View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>

                                        <View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>
                                            <Text
                                                style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, styles.SelfCenter]}>
                                                {i18n.t('price')}
                                            </Text>
                                        </View>

                                        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                            <TouchableOpacity
                                                style={[styles.rowGroup, styles.marginVertical_10]}
                                                onPress={() => this.selectSellaryId(1, 'الآعلي سعر')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style={[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color={styles.text_red}
                                                        selectedColor={styles.text_red}
                                                        checked={this.state.SalleId === 1}
                                                    />
                                                    <Text
                                                        style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        الآعلي سعر
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.rowGroup, styles.marginVertical_10]}
                                                onPress={() => this.selectSellaryId(2, 'الآقل سعر')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style={[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color={styles.text_red}
                                                        selectedColor={styles.text_red}
                                                        checked={this.state.SalleId === 2}
                                                    />
                                                    <Text
                                                        style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        الآقل سعر
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </Modal>

                                <View style={styles.viewBlock}>

                                    <Swiper
                                        containerStyle={[styles.Width_95, styles.marginVertical_15, styles.swiper, styles.viewBlock]}
                                        autoplay={true}
                                        paginationStyle={[styles.paginationStyle]}
                                        dotStyle={{borderRadius: 0, height: 10, width: 4, backgroundColor: '#DDD'}}
                                        activeDotStyle={{
                                            backgroundColor: '#F00',
                                            width: 4,
                                            borderRadius: 0,
                                            height: 25
                                        }}
                                        animated={true}
                                        loop={true}
                                        autoplayTimeout={2}>

                                        <View style={[styles.viewBlock]}>
                                            <Image style={[styles.Width_95, styles.swiper]}
                                                   source={require('../../assets/img/4.png')}/>
                                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}
                                                             style={[styles.blockContent, styles.Width_50]}>
                                                <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                    <Text
                                                        style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft]}
                                                        numberOfLines={1} prop with ellipsizeMode="tail">
                                                        home
                                                    </Text>
                                                    <Text
                                                        style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft]}
                                                        numberOfLines={1} prop with ellipsizeMode="tail">
                                                        description
                                                    </Text>
                                                    <View>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft, styles.textDecoration]}
                                                            numberOfLines={1} prop with ellipsizeMode="tail">
                                                            {i18n.t('here')}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Animatable.View>
                                        </View>

                                        <View style={[styles.viewBlock]}>
                                            <Image style={[styles.Width_95, styles.swiper]}
                                                   source={require('../../assets/img/4.png')}/>
                                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}
                                                             style={[styles.blockContent, styles.Width_50]}>
                                                <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                    <Text
                                                        style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft]}
                                                        numberOfLines={1} prop with ellipsizeMode="tail">
                                                        home
                                                    </Text>
                                                    <Text
                                                        style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft]}
                                                        numberOfLines={1} prop with ellipsizeMode="tail">
                                                        description
                                                    </Text>
                                                    <View>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft, styles.textDecoration]}
                                                            numberOfLines={1} prop with ellipsizeMode="tail">
                                                            {i18n.t('here')}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Animatable.View>
                                        </View>

                                        <View style={[styles.viewBlock]}>
                                            <Image style={[styles.Width_95, styles.swiper]}
                                                   source={require('../../assets/img/4.png')}/>
                                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}
                                                             style={[styles.blockContent, styles.Width_50]}>
                                                <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                    <Text
                                                        style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft]}
                                                        numberOfLines={1} prop with ellipsizeMode="tail">
                                                        home
                                                    </Text>
                                                    <Text
                                                        style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft]}
                                                        numberOfLines={1} prop with ellipsizeMode="tail">
                                                        description
                                                    </Text>
                                                    <View>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft, styles.textDecoration]}
                                                            numberOfLines={1} prop with ellipsizeMode="tail">
                                                            {i18n.t('here')}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Animatable.View>
                                        </View>

                                    </Swiper>

                                </View>

                                <View style={[styles.height_40]}>
                                    <ScrollView style={[styles.scroll]} horizontal={true}
                                                showsHorizontalScrollIndicator={false}>

                                        <TouchableOpacity
                                            onPress={() => this.onSubCategories(1)}
                                            style={[styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, {backgroundColor: this.state.active === 1 ? '#d3292a' : '#f8dede'}]}>
                                            <Text
                                                style={[styles.textRegular, styles.textSize_12, {color: this.state.active === 1 ? '#FFF' : '#a09f9f'}]}>
                                                الكل
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.onSubCategories(2)}
                                            style={[styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, {backgroundColor: this.state.active === 2 ? '#d3292a' : '#f8dede'}]}>
                                            <Text
                                                style={[styles.textRegular, styles.textSize_12, {color: this.state.active === 2 ? '#FFF' : '#a09f9f'}]}>
                                                وجبات سريعه
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.onSubCategories(3)}
                                            style={[styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, {backgroundColor: this.state.active === 3 ? '#d3292a' : '#f8dede'}]}>
                                            <Text
                                                style={[styles.textRegular, styles.textSize_12, {color: this.state.active === 3 ? '#FFF' : '#a09f9f'}]}>
                                                وجبات محليه
                                            </Text>
                                        </TouchableOpacity>

                                    </ScrollView>
                                </View>

                                <View
                                    style={[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden, styles.Width_100]}>

                                    <View
                                        style={[styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5]}>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}
                                                         style={[styles.Width_100]}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('Details')}
                                                style={[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                                <View style={[styles.Width_100, styles.position_R]}>
                                                    <Image style={[styles.Width_100, styles.height_100]}
                                                           source={require('../../assets/img/1.png')}/>
                                                    <View
                                                        style={[styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup]}>
                                                        <View style={[styles.rowRight]}>
                                                            <Icon
                                                                style={[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                                type="FontAwesome"
                                                                name='circle'
                                                            />
                                                            <Text
                                                                style={[styles.textRegular, styles.text_White, styles.textSize_10]}
                                                                numberOfLines={1} prop with ellipsizeMode="tail">
                                                                اسم الشيف
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity>
                                                            <Icon
                                                                style={[styles.text_gray, styles.textSize_20]}
                                                                type="MaterialIcons"
                                                                name='favorite-border'
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={[styles.Width_100, styles.marginVertical_5]}>
                                                    <View style={[styles.rowGroup, styles.marginVertical_5]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر
                                                            لحم</Text>
                                                        <StarRating
                                                            disabled={true}
                                                            maxStars={5}
                                                            rating={3}
                                                            fullStarColor={COLORS.red}
                                                            starSize={12}
                                                            starStyle={styles.starStyle}
                                                        />
                                                    </View>
                                                    <View style={[styles.rowGroup]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10
                                                            ر.س</Text>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25
                                                            كم</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>

                                    <View
                                        style={[styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5]}>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}
                                                         style={[styles.Width_100]}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('Details')}
                                                style={[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                                <View style={[styles.Width_100, styles.position_R]}>
                                                    <Image style={[styles.Width_100, styles.height_100]}
                                                           source={require('../../assets/img/2.png')}/>
                                                    <View
                                                        style={[styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup]}>
                                                        <View style={[styles.rowRight]}>
                                                            <Icon
                                                                style={[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                                type="FontAwesome"
                                                                name='circle'
                                                            />
                                                            <Text
                                                                style={[styles.textRegular, styles.text_White, styles.textSize_10]}
                                                                numberOfLines={1} prop with ellipsizeMode="tail">
                                                                اسم الشيف
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity>
                                                            <Icon
                                                                style={[styles.text_gray, styles.textSize_20]}
                                                                type="MaterialIcons"
                                                                name='favorite-border'
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={[styles.Width_100, styles.marginVertical_5]}>
                                                    <View style={[styles.rowGroup, styles.marginVertical_5]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر
                                                            لحم</Text>
                                                        <StarRating
                                                            disabled={true}
                                                            maxStars={5}
                                                            rating={3}
                                                            fullStarColor={COLORS.red}
                                                            starSize={12}
                                                            starStyle={styles.starStyle}
                                                        />
                                                    </View>
                                                    <View style={[styles.rowGroup]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10
                                                            ر.س</Text>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25
                                                            كم</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>

                                    <View
                                        style={[styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5]}>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}
                                                         style={[styles.Width_100]}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('Details')}
                                                style={[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                                <View style={[styles.Width_100, styles.position_R]}>
                                                    <Image style={[styles.Width_100, styles.height_100]}
                                                           source={require('../../assets/img/3.png')}/>
                                                    <View
                                                        style={[styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup]}>
                                                        <View style={[styles.rowRight]}>
                                                            <Icon
                                                                style={[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                                type="FontAwesome"
                                                                name='circle'
                                                            />
                                                            <Text
                                                                style={[styles.textRegular, styles.text_White, styles.textSize_10]}
                                                                numberOfLines={1} prop with ellipsizeMode="tail">
                                                                اسم الشيف
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity>
                                                            <Icon
                                                                style={[styles.text_gray, styles.textSize_20]}
                                                                type="MaterialIcons"
                                                                name='favorite-border'
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={[styles.Width_100, styles.marginVertical_5]}>
                                                    <View style={[styles.rowGroup, styles.marginVertical_5]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر
                                                            لحم</Text>
                                                        <StarRating
                                                            disabled={true}
                                                            maxStars={5}
                                                            rating={3}
                                                            fullStarColor={COLORS.red}
                                                            starSize={12}
                                                            starStyle={styles.starStyle}
                                                        />
                                                    </View>
                                                    <View style={[styles.rowGroup]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10
                                                            ر.س</Text>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25
                                                            كم</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>

                                    <View
                                        style={[styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5]}>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}
                                                         style={[styles.Width_100]}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('Details')}
                                                style={[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                                <View style={[styles.Width_100, styles.position_R]}>
                                                    <Image style={[styles.Width_100, styles.height_100]}
                                                           source={require('../../assets/img/4.png')}/>
                                                    <View
                                                        style={[styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup]}>
                                                        <View style={[styles.rowRight]}>
                                                            <Icon
                                                                style={[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                                type="FontAwesome"
                                                                name='circle'
                                                            />
                                                            <Text
                                                                style={[styles.textRegular, styles.text_White, styles.textSize_10]}
                                                                numberOfLines={1} prop with ellipsizeMode="tail">
                                                                اسم الشيف
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity>
                                                            <Icon
                                                                style={[styles.text_gray, styles.textSize_20]}
                                                                type="MaterialIcons"
                                                                name='favorite-border'
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={[styles.Width_100, styles.marginVertical_5]}>
                                                    <View style={[styles.rowGroup, styles.marginVertical_5]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر
                                                            لحم</Text>
                                                        <StarRating
                                                            disabled={true}
                                                            maxStars={5}
                                                            rating={3}
                                                            fullStarColor={COLORS.red}
                                                            starSize={12}
                                                            starStyle={styles.starStyle}
                                                        />
                                                    </View>
                                                    <View style={[styles.rowGroup]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10
                                                            ر.س</Text>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25
                                                            كم</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>

                                </View>

                            </View>
                            :
                            null
                    }
                    {
                        this.props.user != null && this.props.user.type === 'provider' ?
                            <View style={[styles.position_R, styles.top_10, styles.paddingVertical_30]}>

                                <View style={[styles.viewBlock, styles.bg_White, styles.Width_90, styles.overHidden]}>
                                    <Animatable.View animation="fadeInLeft" easing="ease-out" delay={500}
                                                     style={[styles.width_40, styles.height_40, styles.overlay_black, styles.position_A, styles.top_10, styles.right_0, styles.zIndex]}>
                                        <TouchableOpacity
                                            style={[styles.width_40, styles.height_40, styles.flexCenter]}
                                            onPress={() => this.props.navigation.navigate('EditShop')}
                                        >
                                            <Icon style={[styles.text_White, styles.textSize_18]} type="AntDesign"
                                                  name='edit'/>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                    <Image style={[styles.Width_100, styles.height_200]}
                                           source={{uri : this.props.providerHome.provider.cover}}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}
                                                     style={[styles.blockContent, styles.top_35, styles.overlay_black]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <View style={[styles.rowRight]}>
                                                <Icon
                                                    style={[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                    type="FontAwesome"
                                                    name='circle'
                                                />
                                                <Text
                                                    style={[styles.textBold, styles.text_White, styles.width_150, styles.textSize_12, styles.textLeft]}
                                                    numberOfLines={1} prop with ellipsizeMode="tail">
                                                    {this.props.providerHome.provider.provider_name}
                                                </Text>
                                            </View>
                                            <View style={[styles.width_70]}>
                                                <StarRating
                                                    disabled={true}
                                                    maxStars={5}
                                                    rating={this.props.providerHome.provider.rate}
                                                    fullStarColor={COLORS.red}
                                                    starSize={12}
                                                    starStyle={styles.starStyle}
                                                />
                                            </View>
                                            <Text
                                                style={[styles.textRegular, styles.text_White, styles.width_150, styles.textSize_12, styles.textLeft]}
                                                numberOfLines={1} prop with ellipsizeMode="tail">
                                                {this.props.providerHome.provider.provider_details}
                                            </Text>
                                            <View style={[styles.rowGroup]}>
                                                <Icon
                                                    style={[styles.text_White, styles.textSize_12, styles.marginHorizontal_5]}
                                                    type="Feather" name='map-pin'/>
                                                <Text
                                                    style={[styles.textRegular, styles.text_White, styles.textSize_12, styles.width_150,]}
                                                    numberOfLines={1} prop with ellipsizeMode="tail">
                                                    {this.props.providerHome.provider.address}
                                                </Text>
                                            </View>
                                        </View>
                                    </Animatable.View>
                                </View>

                                <View style={[styles.height_40, styles.marginVertical_10]}>
                                    <ScrollView style={[styles.scroll]} horizontal={true}
                                                showsHorizontalScrollIndicator={false}>

                                        <TouchableOpacity
                                            onPress={() => this.onSubCategories(null)}
                                            style={[styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, {backgroundColor: this.state.active === null ? '#d3292a' : '#eee'}]}>
                                            <Text
                                                style={[styles.textRegular, styles.textSize_12, {color: this.state.active === null ? '#FFF' : '#a09f9f'}]}>
                                                الكل
                                            </Text>
                                        </TouchableOpacity>

                                        {
                                            this.props.categories.map((cat, i) => (
                                                <TouchableOpacity
                                                    key={i}
                                                    onPress={() => this.onSubCategories(cat.id)}
                                                    style={[styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, {backgroundColor: this.state.active === cat.id ? '#d3292a' : '#eee'}]}>
                                                    <Text
                                                        style={[styles.textRegular, styles.textSize_12, {color: this.state.active === cat.id ? '#FFF' : '#a09f9f'}]}>
                                                        {cat.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))
                                        }

                                    </ScrollView>
                                </View>

                                <View
                                    style={[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden, styles.Width_100]}>
                                    {
                                        this.props.providerHome.meals.map((meal, i) => (
                                            <View
                                                key={i}
                                                style={[styles.position_R, styles.Width_45, styles.marginHorizontal_5, styles.marginVertical_10]}>
                                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}
                                                                 style={[styles.Width_100]}>
                                                    <View
                                                        style={[styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full]}/>
                                                    <TouchableOpacity
                                                        onPress={() => this.props.navigation.navigate('ViewProduct' , {meal_id : meal.id , latitude:this.props.providerHome.provider.latitude, longitude:this.props.providerHome.provider.longitude})}
                                                        style={[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5, styles.overHidden, styles.bg_White]}>
                                                        <View style={[styles.Width_100, styles.position_R]}>
                                                            <Image style={[styles.Width_100, styles.height_100]}
                                                                   source={require('../../assets/img/1.png')}/>
                                                        </View>
                                                        <View style={[styles.Width_100, styles.marginVertical_5]}>
                                                            <View style={[styles.rowGroup, styles.marginVertical_5]}>
                                                                <Text
                                                                    style={[styles.textRegular, styles.text_black, styles.textSize_12]}>{meal.title}</Text>
                                                            </View>
                                                            <View style={[styles.rowGroup]}>
                                                                <Text
                                                                    style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>{meal.description}</Text>
                                                            </View>
                                                            <View style={[styles.rowGroup, styles.marginVertical_5]}>
                                                                <Text
                                                                    style={[styles.textRegular, styles.text_red, styles.textSize_12, styles.border_right, styles.paddingHorizontal_10]}>{meal.price}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </Animatable.View>
                                            </View>
                                        ))
                                    }

                                </View>

                            </View>
                            :
                            null
                    }

                </Content>
                {
                    this.props.user != null && this.props.user.type === 'provider' ?
                        <TouchableOpacity
                            style={[styles.rotatTouch, styles.width_50, styles.height_50, styles.flexCenter, styles.bg_red, styles.position_A, styles.bottom_40, styles.boxShadow]}
                            onPress={() => this.props.navigation.navigate('AddProduct')}
                        >
                            <Icon style={[styles.text_White, styles.textSize_26, styles.rotatIcon]} type="AntDesign"
                                  name='plus'/>
                        </TouchableOpacity>
                        :
                        null
                }

            </Container>

        );
    }
}


const mapStateToProps = ({ auth, profile, lang , categories , providerHome}) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang,
        categories: categories.categories,
        providerHome: providerHome.providerHome,
    };
};
export default connect(mapStateToProps, {getCategories , getProviderHome})(Home);
