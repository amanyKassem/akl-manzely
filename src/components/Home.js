import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    Linking,
    Dimensions,
    I18nManager
} from "react-native";
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
import {getCategories , getProviderHome, getBanners , getMeals} from "../actions";
import COLORS from "../consts/colors";
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import SearchInput from './SearchInput'
import Product from './Product'

const isIOS     = Platform.OS === 'ios';
const height    = Dimensions.get('window').height;
let children    = [];

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
            longitude               : null,
			activeParent            : null,
            children                : []
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

        this.setState({ spinner : false});
        // this.setState({ isModalFilter   : !this.state.isModalFilter , spinner : false});

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

    renderNoData() {
        if (this.props.providerHome.meals && (this.props.providerHome.meals).length <= 0) {
            return (
                <View style={[styles.flexColumnCenter , styles.Width_100]}>
                    <Image source={require('../../assets/img/no_data.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return <View/>
    }

    renderMealsNoData() {
        if (this.props.meals && (this.props.meals).length <= 0) {
            return (
                <View style={[styles.flexColumnCenter , styles.Width_100]}>
                    <Image source={require('../../assets/img/no_data.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return <View/>
    }

    onSubCategories ( id, subcategories, mainCat ){
        if (mainCat) children = [];


		if (this.props.auth.data.type === 'user' && subcategories.length > 0){
			subcategories.map((subcategory) => {
				if (children.includes(subcategory)){
					const index = children.indexOf(subcategory);
					children.splice(index, 1)
				} else
					children.push(subcategory);

			})
		}

		this.setState({ activeParent: id, children });

        this.setState({spinner: true, active: mainCat ? id : this.state.active});
        this.props.auth.data.type === 'provider'?
        this.props.getProviderHome(this.props.lang , id , this.props.user.token) :
        this.props.getMeals(this.props.lang , id , this.props.auth.data.latitude , this.props.auth.data.longitude , this.props.auth.data.token);
    }

    toggleModalFilter = () => {
        this.setState({ isModalFilter   : !this.state.isModalFilter});
    };

    toggleModalRate = () => {
        // this.setState({ isModalFilter   : !this.state.isModalFilter});
        this.setState({ isModalRate     : !this.state.isModalRate});
    };

    toggleModalSallery = () => {
        this.setState({ isModalSallery  : !this.state.isModalSallery});
        // this.setState({ isModalFilter   : !this.state.isModalFilter});
    };

    selectRateId(id, name) {
        this.setState({
            rateId       : id,
            rate         : name
        });
        this.state.reteId = id;
        this.setState({ isModalRate     : !this.state.isModalRate});
        // this.setState({ isModalFilter   : !this.state.isModalFilter});
    }

    selectSellaryId(id, name) {
        this.setState({
            SalleryId       : id,
            Sallery         : name
        });
        this.state.SalleId = id;
        this.setState({ isModalSallery  : !this.state.isModalSallery});
        // this.setState({ isModalFilter   : !this.state.isModalFilter});
    }

    componentWillMount() {
        this.setState({spinner: true});
        this.props.getCategories(this.props.lang ,this.props.auth.data.type === 'provider'? null : null);
        this.props.getProviderHome(this.props.lang , null , this.props.auth.data.token);
        this.props.getMeals(this.props.lang , null , this.props.auth.data.latitude , this.props.auth.data.longitude , this.props.auth.data.token);
        this.props.getBanners(this.props.lang , this.props.auth.data.token);
    }

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('home')}</Text>) ,
        drawerIcon      : (<Image style={[styles.headImage]} source={require('../../assets/img/home.png')} resizeMode={'contain'}/>)
    });

	setSub(children, activeParent){
	    if (children.length > 0)
	        this.setState({ activeParent, children });
    }


	RenderChildren = (subcategories) => {

	    const { children } = this.state;

	    // alert(children.length);

		return children.map((child, j) =>{
            return (
                <View>
                    <TouchableOpacity onPress={() => this.onSubCategories(child.id, child.childes, false)} key={j} style={{ backgroundColor: '#f6d4d4', marginVertical: 2, height: 30 }}>
                        <Text style={{ color: '#dd5c5a', textAlign: 'center' }}>{ (child.name).substr(0, 10) }</Text>
                    </TouchableOpacity>
                    <View >
                        {
							child.childes.map((sub, i) => (
                                <TouchableOpacity onPress={() => this.onSubCategories(sub.id, sub.childes, false)} key={i} style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#dd5c5a', marginVertical: 2, height: 30 }}>
                                    <Text style={{ color: '#dd5c5a', textAlign: 'center' }}>{ (sub.name).substr(0, 10) }</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            )
		})
	}


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
                            this.props.user == null || this.props.user.type === 'user'?
                                <SearchInput navigation={this.props.navigation} />
                                :
                                <Title style={[styles.textRegular , styles.text_red, styles.textSize_16, styles.textLeft, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                                    { i18n.t('home') }
                                </Title>
                        }


                    </Body>
                    <Right style={styles.rightIcon}>
                        {
                            this.props.user == null || this.props.user.type === 'user'?
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
                            this.props.user == null || this.props.user.type === 'user'?
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
                        this.props.user == null || this.props.user.type === 'user' ?
                            <View style={[styles.boxUser]}>

                                <Modal isVisible={this.state.isModalFilter}
                                       onBackdropPress={() => this.toggleModalFilter()}
                                       style={[styles.bottomCenter, styles.Width_100]}>
                                    <View
                                        style={[styles.overHidden, styles.bg_White, styles.flexCenter, styles.Width_100, styles.position_R, styles.top_45 , {height:500 , paddingTop:40}]}>

                                        <View style={[styles.paddingVertical_15]}>
                                            <Text
                                                style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textLeft, styles.SelfCenter]}>
                                                {i18n.t('searchchef')}
                                            </Text>
                                        </View>

                                        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
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
                                            </KeyboardAvoidingView>
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
                                                        {i18n.t('topRated')}
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
                                                        {i18n.t('lowRated')}
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
                                                        {i18n.t('topPrice')}
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
                                                        {i18n.t('lowPrice')}
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

                                        {
                                            this.props.banners?
                                                this.props.banners.map((banner, i) => (
                                                    <View key={i} style={[styles.viewBlock]}>
                                                        <Image style={[styles.Width_95, styles.swiper]}
                                                               source={{uri:banner.image}}/>
                                                        <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}
                                                                         style={[styles.blockContent, styles.Width_50]}>
                                                            <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                                <Text
                                                                    style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft]}
                                                                    numberOfLines={1} prop with ellipsizeMode="tail">
                                                                    {banner.title}
                                                                </Text>
                                                                <Text
                                                                    style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft]}
                                                                    numberOfLines={1} prop with ellipsizeMode="tail">
                                                                    {banner.description}
                                                                </Text>
                                                                <TouchableOpacity onPress={() => Linking.openURL(banner.url)}>
                                                                    <Text
                                                                        style={[styles.textRegular, styles.text_White, styles.Width_100, styles.textSize_12, styles.textLeft, styles.textDecoration]}
                                                                        numberOfLines={1} prop with ellipsizeMode="tail">
                                                                        {i18n.t('here')}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </Animatable.View>
                                                    </View>
                                                ))
                                                :
                                                null
                                        }

                                    </Swiper>
                                </View>

                                <View style={{ zIndex: 3 }}>
                                    <ScrollView style={[styles.scroll, { maxHeight: height, zIndex: 10, flex: 1, height: 200 }]} horizontal={true} showsHorizontalScrollIndicator={false}>

                                        <TouchableOpacity
                                            onPress={() => this.onSubCategories(null, [], true)}
                                            style={[styles.paddingHorizontal_15, styles.paddingVertical_5, styles.marginVertical_5, styles.marginHorizontal_5, {backgroundColor: this.state.active === null ? '#d3292a' : '#eee', height: 30}]}>
                                            <Text
                                                style={[styles.textRegular, styles.textSize_12, {color: this.state.active === null ? '#FFF' : '#a09f9f'}]}>
                                                {i18n.translate('all')}

                                            </Text>
                                        </TouchableOpacity>
                                        {
                                            this.props.categories.map(( category, i ) => (
                                                <View key={i}>
													<TouchableOpacity
														onPress={() => this.onSubCategories(category.id, category.childes, true)}
														style={[styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, {backgroundColor: this.state.active === category.id ? '#d3292a' : '#eee'}]}>
														<Text
															style={[styles.textRegular, styles.textSize_12, {color: this.state.active === category.id ? '#FFF' : '#a09f9f'}]}>
															{ category.name }
														</Text>
													</TouchableOpacity>
                                                    {
														category.childes.length > 0 && this.state.active === category.id ?
															<ScrollView vertical={true}  style={{ backgroundColor: '#fff', width: '100%', position: 'absolute', top: 35, zIndex: 1, padding: 3, maxHeight: 200 }}>
                                                                { this.RenderChildren(category.childes) }
															</ScrollView> : null
                                                    }
                                                </View>
                                            ))
                                        }

                                    </ScrollView>
                                </View>

                                <View style={[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden, styles.Width_100, { zIndex: -1, marginTop: 170 , position: 'absolute' }]}>
                                    {this.renderMealsNoData()}
                                    {
                                        this.props.meals?
                                            this.props.meals.map((meal, i) => (
                                                <Product key={meal.id} data={meal} navigation={this.props.navigation} />
                                            ))
                                            :
                                            null
                                    }


                                </View>

                            </View>
                            :
                            null
                    }
                    {
                        this.props.user != null && this.props.user.type === 'provider' && this.props.providerHome.provider?
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
                                    <ScrollView style={[styles.scroll, { maxHeight: height, zIndex: 10, flex: 1, height: 200 }]} horizontal={true} showsHorizontalScrollIndicator={false}>

                                        <TouchableOpacity
                                            onPress={() => this.onSubCategories(null, [], true)}
                                            style={[styles.paddingHorizontal_15, styles.paddingVertical_5, styles.marginVertical_5, styles.marginHorizontal_5, {backgroundColor: this.state.active === null ? '#d3292a' : '#eee', height: 30}]}>
                                            <Text
                                                style={[styles.textRegular, styles.textSize_12, {color: this.state.active === null ? '#FFF' : '#a09f9f'}]}>
                                                {i18n.translate('all')}

                                            </Text>
                                        </TouchableOpacity>
                                        {
                                            this.props.categories.map(( category, i ) => (
                                                <View key={i}>
                                                    <TouchableOpacity
                                                        onPress={() => this.onSubCategories(category.id, category.childes, true)}
                                                        style={[styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, {backgroundColor: this.state.active === category.id ? '#d3292a' : '#eee'}]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.textSize_12, {color: this.state.active === category.id ? '#FFF' : '#a09f9f'}]}>
                                                            { category.name }
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {
                                                        category.childes.length > 0 && this.state.active === category.id ?
                                                            <ScrollView vertical={true}  style={{ backgroundColor: '#fff', width: '100%', position: 'absolute', top: 35, zIndex: 1, padding: 3, maxHeight: 200 }}>
                                                                { this.RenderChildren(category.childes) }
                                                            </ScrollView> : null
                                                    }
                                                </View>
                                            ))
                                        }

                                    </ScrollView>
                                </View>

                                <View
                                    style={[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden, styles.Width_100]}>
                                    {this.renderNoData()}
                                    {
                                        this.props.providerHome && this.props.providerHome.meals ?
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
                                                                       source={{uri : meal.image}}/>
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
                                                                        style={[styles.textRegular, styles.text_red, styles.textSize_12,I18nManager.isRTL ? styles.border_right : styles.border_left, styles.paddingHorizontal_10]}>{meal.price} {i18n.t('RS')}</Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </Animatable.View>
                                                </View>
                                            ))
                                            :
                                            null
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


const mapStateToProps = ({ auth, profile, lang , categories , providerHome , banners , meals}) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang,
        categories: categories.categories,
        providerHome: providerHome.providerHome,
        meals: meals.meals,
        banners: banners.banners,
    };
};
export default connect(mapStateToProps, {getCategories , getProviderHome , getBanners , getMeals})(Home);
