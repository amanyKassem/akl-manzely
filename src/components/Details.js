import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList, KeyboardAvoidingView, Share, Switch} from "react-native";
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
    CheckBox, Form, Textarea
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import COLORS from "../consts/colors";
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";

const isIOS = Platform.OS === 'ios';

class Details extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                 : false,
            isModalFilter           : false,
            isModalRate             : false,
            isModalSallery          : false,
            isModalComment          : false,
            isModalSelect           : false,
            active                  : 1,
            count                   : 0,
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
            value2                  : 1,
            Error                   : '',
            comment                 : '',
            select                  : 'وجبات سريعه',
            switchValue             : true,
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

        this.setState({ isModalFilter   : !this.state.isModalFilter});

    }

    getLocation(){

        this.props.navigation.navigate('MapLocation', {
            pageName : this.props.navigation.state.routeName
        });

        this.setState({ isModalFilter   : !this.state.isModalFilter});

    }

    onSubCategories ( id ){
        this.setState({spinner: true, active : id });
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
            reteId      : id,
            rate        : name
        });
        this.setState({ isModalRate     : !this.state.isModalRate});
        this.setState({ isModalFilter   : !this.state.isModalFilter});
    }

    selectSellaryId(id, name) {
        this.setState({
            SalleryId    : id,
            Sallery      : name
        });
        this.setState({ isModalSallery  : !this.state.isModalSallery});
        this.setState({ isModalFilter   : !this.state.isModalFilter});
    }

    toggleModalSelect = () => {
        this.setState({ isModalSelect   : !this.state.isModalSelect});
    };

    selectSelectId(id, name) {
        this.setState({
            selectId        : id,
            select          : name
        });
        this.setState({ isModalSelect   : !this.state.isModalSelect});
    }

    incrementCount(){
        this.setState({count: this.state.count + 1});
    }
    decrementCount(){
        this.setState({count: this.state.count - 1});
    }

    toggleModalComment = () => {
        this.setState({ isModalComment  : !this.state.isModalComment});
    };

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.comment === '') {
            isError     = true;
            msg         = i18n.t('addcomm');
        }else if (this.state.value2.length <= 0) {
            isError     = true;
            msg         = i18n.t('starts');
        }

        if (msg !== '') {
            this.setState({ Error : msg});
        }

        return isError;
    };

    sentComment(){

        const err = this.validate();

        if (!err){
            this.setState({ isModalComment  : !this.state.isModalComment, Error : ''});
        }

    }

    increment2() {
        if (this.state.value2 < 5)
            this.setState({value2: this.state.value2 + 1})
    }

    decrement2() {
        if (this.state.value2 > 1)
            this.setState({value2: this.state.value2 - 1})
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

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

    componentWillMount() {

        this.setState({spinner: true});

    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity
                onPress     = {() => this.props.navigation.navigate('FilterCategory')}
                key         = { item.index }
                style       = {[styles.position_R, styles.Width_50, styles.bg_red]}>
                <Animatable.View animation="zoomIn" easing="ease-out" delay={500}>
                    <Text>hello</Text>
                </Animatable.View>
            </TouchableOpacity>
        );
    };

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('home')}</Text>) ,
        drawerIcon      : (<Image style={[styles.headImage]} source={require('../../assets/img/home.png')} resizeMode={'contain'}/>)
    });

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
                        <View style={[styles.position_R, styles.SelfRight]}>
                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder={i18n.translate('searchCat')}
                                    style={[styles.input, styles.height_40, styles.BorderNone, styles.paddingRight_5, styles.paddingLeft_5 ,styles.textSize_14,styles.text_red, {backgroundColor : "#dcd8d8"}]}
                                    autoCapitalize='none'
                                    placeholderTextColor='#d8999a'
                                    onChangeText={(categorySearch) => this.setState({categorySearch})}
                                />
                            </Item>
                            <TouchableOpacity
                                style={[styles.position_A, styles.right_0, styles.width_50, styles.height_40, styles.flexCenter]}
                                onPress={() => this.onSearch()}>
                                <Image style={[styles.headImage]} source={require('../../assets/img/search.png')} resizeMode={'contain'}/>
                            </TouchableOpacity>
                        </View>
                        {/*<Title style={[styles.textRegular , styles.text_red, styles.textSize_16, styles.textLeft, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>*/}
                        {/*    { i18n.t('home') }*/}
                        {/*</Title>*/}
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.toggleModalFilter()}>
                            <Image style={[styles.headImage]} source={require('../../assets/img/controls.png')} resizeMode={'contain'}/>
                        </Button>
                        <Button style={styles.Button} transparent onPress={()=> this.onShare()} >
                            <Image style={[styles.headImage]} source={require('../../assets/img/share.png')} resizeMode={'contain'}/>
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0 ]}/>

                    <View style={[ styles.boxUser ]}>

                        <Modal isVisible={this.state.isModalFilter} onBackdropPress={() => this.toggleModalFilter()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                            <View style={[styles.overHidden, styles.bg_White, styles.flexCenter , styles.Width_100, styles.position_R, styles.top_20]}>

                                <View style={[styles.paddingVertical_15]}>
                                    <Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textLeft , styles.SelfCenter]}>
                                        {i18n.t('searchchef')}
                                    </Text>
                                </View>

                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                                    <Form style={[styles.Width_90, styles.marginVertical_10, styles.flexCenter]}>

                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
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
                                            <TouchableOpacity onPress={() => this.toggleModalRate()} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, ( this.state.rateId !== null ? styles.border_red : styles.border_gray )]}>
                                                <Text style={[styles.textRegular, styles.textSize_14, ( this.state.rateId !== null ? styles.text_red : styles.text_black )]}>
                                                    { this.state.rate }
                                                </Text>
                                                <Icon style={[styles.textSize_20, styles.text_light_gray]} type="AntDesign" name='down' />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[styles.overHidden, styles.rowGroup]}>
                                            <TouchableOpacity onPress={() => this.toggleModalSallery()} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, ( this.state.SalleryId !== null ? styles.border_red : styles.border_gray )]}>
                                                <Text style={[styles.textRegular, styles.textSize_14, ( this.state.SalleryId !== null ? styles.text_red : styles.text_black )]}>
                                                    { this.state.Sallery }
                                                </Text>
                                                <Icon style={[styles.textSize_20, styles.text_light_gray]} type="AntDesign" name='down' />
                                            </TouchableOpacity>
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

                                        <TouchableOpacity
                                            style       = {[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40]}
                                            onPress     = {() => this.props.navigation.navigate('Home')}>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                                {i18n.translate('search')}
                                            </Text>
                                        </TouchableOpacity>

                                    </Form>

                                </View>

                            </View>
                        </Modal>

                        <Modal isVisible={this.state.isModalRate} onBackdropPress={() => this.toggleModalRate()}>
                            <View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>

                                <View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>
                                    <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                                        {i18n.t('starrate')}
                                    </Text>
                                </View>

                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                    <TouchableOpacity
                                        style               = {[styles.rowGroup, styles.marginVertical_10]}
                                        onPress             = {() => this.selectRateId(1, 'الآعلي تقييم')}
                                    >
                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <CheckBox
                                                style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                color               = {styles.text_red}
                                                selectedColor       = {styles.text_red}
                                                checked             = {this.state.reteId === 1}
                                            />
                                            <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                الآعلي تقييم
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style               = {[styles.rowGroup, styles.marginVertical_10]}
                                        onPress             = {() => this.selectRateId(2, 'الآقل تقييم')}
                                    >
                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <CheckBox
                                                style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                color               = {styles.text_red}
                                                selectedColor       = {styles.text_red}
                                                checked             = {this.state.reteId === 2}
                                            />
                                            <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                الآقل تقييم
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Modal>

                        <Modal isVisible={this.state.isModalSallery} onBackdropPress={() => this.toggleModalSallery()}>
                            <View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>

                                <View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>
                                    <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                                        {i18n.t('price')}
                                    </Text>
                                </View>

                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                    <TouchableOpacity
                                        style               = {[styles.rowGroup, styles.marginVertical_10]}
                                        onPress             = {() => this.selectSellaryId(1, 'الآعلي سعر')}
                                    >
                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <CheckBox
                                                style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                color               = {styles.text_red}
                                                selectedColor       = {styles.text_red}
                                                checked             = {this.state.SalleId === 1}
                                            />
                                            <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                الآعلي سعر
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style               = {[styles.rowGroup, styles.marginVertical_10]}
                                        onPress             = {() => this.selectSellaryId(2, 'الآقل سعر')}
                                    >
                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <CheckBox
                                                style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                color               = {styles.text_red}
                                                selectedColor       = {styles.text_red}
                                                checked             = {this.state.SalleId === 2}
                                            />
                                            <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                الآقل سعر
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Modal>

                        <View style={[ styles.position_R, styles.overHidden ]}>
                            <Animatable.View animation="fadeIn" easing="ease-out" delay={500} style = {[styles.width_40 , styles.height_40, styles.position_A, styles.top_15, styles.right_35, styles.zIndex, styles.overlay_black]}>
                                <TouchableOpacity style = {[ styles.width_40 , styles.height_40, styles.flexCenter ]}>
                                    <Icon style = {[styles.text_red, styles.textSize_18]} type="AntDesign" name='heart' />
                                </TouchableOpacity>
                            </Animatable.View>
                            <Swiper
                                containerStyle      = {[styles.Width_95, styles.marginVertical_15, styles.height_120, styles.viewBlock]}
                                autoplay            = {true}
                                paginationStyle     = {[styles.paginationStyle]}
                                dotStyle            = {{borderRadius : 0, height : 10, width: 4, backgroundColor: '#DDD'}}
                                activeDotStyle      = {{ backgroundColor: '#F00', width: 4, borderRadius : 0, height : 25}}
                                animated            = {true}
                                loop                = {true}
                                autoplayTimeout     = { 2 }>

                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_95, styles.height_120]} source={require('../../assets/img/4.png')}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.position_A , styles.left_0, styles.bottom_0 , styles.Width_95, styles.overlay_black]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                برجر لحم مشوي علي الفحم
                                            </Text>
                                        </View>
                                    </Animatable.View>
                                </View>

                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_95, styles.height_120]} source={require('../../assets/img/2.png')}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.position_A , styles.left_0, styles.bottom_0 , styles.Width_95, styles.overlay_black]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                برجر لحم مشوي علي الفحم
                                            </Text>
                                        </View>
                                    </Animatable.View>
                                </View>

                            </Swiper>

                        </View>

                        {/*<View style={[styles.overHidden, styles.rowGroup]}>*/}
                        {/*    <TouchableOpacity onPress={() => this.toggleModalSelect()} style={[ styles.marginVertical_5 , styles.marginHorizontal_15 , styles.width_150, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_red]}>*/}
                        {/*        <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>*/}
                        {/*            { this.state.select }*/}
                        {/*        </Text>*/}
                        {/*        <Icon style={[styles.textSize_14, styles.text_White]} type="AntDesign" name='down' />*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}

                        {/*<Modal isVisible={this.state.isModalSelect} onBackdropPress={() => this.toggleModalSelect()} style={[ styles.bottomCenter, styles.Width_100 ]}>*/}
                        {/*    <View style={[styles.overHidden, styles.bg_White, styles.Width_100, styles.position_R, styles.top_20]}>*/}

                        {/*        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>*/}
                        {/*            <TouchableOpacity*/}
                        {/*                style               = {[styles.rowGroup, styles.marginVertical_10]}*/}
                        {/*                onPress             = {() => this.selectSelectId(1, 'وجبات بطيئه')}*/}
                        {/*            >*/}
                        {/*                <View style={[styles.overHidden, styles.rowRight]}>*/}
                        {/*                    <CheckBox*/}
                        {/*                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}*/}
                        {/*                        color               = {styles.text_red}*/}
                        {/*                        selectedColor       = {styles.text_red}*/}
                        {/*                        checked             = {this.state.checked === 1}*/}
                        {/*                    />*/}
                        {/*                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>*/}
                        {/*                        وجبات بطيئه*/}
                        {/*                    </Text>*/}
                        {/*                </View>*/}
                        {/*            </TouchableOpacity>*/}

                        {/*            <TouchableOpacity*/}
                        {/*                style               = {[styles.rowGroup, styles.marginVertical_10]}*/}
                        {/*                onPress             = {() => this.selectSelectId(2, 'وجبات حاره')}*/}
                        {/*            >*/}
                        {/*                <View style={[styles.overHidden, styles.rowRight]}>*/}
                        {/*                    <CheckBox*/}
                        {/*                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}*/}
                        {/*                        color               = {styles.text_red}*/}
                        {/*                        selectedColor       = {styles.text_red}*/}
                        {/*                        checked             = {this.state.checked === 2}*/}
                        {/*                    />*/}
                        {/*                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>*/}
                        {/*                        وجبات حاره*/}
                        {/*                    </Text>*/}
                        {/*                </View>*/}
                        {/*            </TouchableOpacity>*/}
                        {/*        </View>*/}

                        {/*    </View>*/}
                        {/*</Modal>*/}

                        <View style={[ styles.height_40, styles.paddingHorizontal_10 ]}>
                            <ScrollView style={[ styles.scroll ]} horizontal={true} showsHorizontalScrollIndicator={false}>

                                <TouchableOpacity
                                    onPress         = {() => this.onSubCategories(1)}
                                    style           = {[ styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, { backgroundColor : this.state.active === 1  ? '#d3292a' : '#f8dede' } ]}>
                                    <Text style     = {[ styles.textRegular, styles.textSize_12 , { color : this.state.active === 1 ? '#FFF' : '#a09f9f' }]} >
                                        الكل
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress         = {() => this.onSubCategories(2)}
                                    style           = {[ styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, { backgroundColor : this.state.active === 2  ? '#d3292a' : '#f8dede' } ]}>
                                    <Text style     = {[ styles.textRegular, styles.textSize_12 , { color : this.state.active === 2 ? '#FFF' : '#a09f9f' }]} >
                                        وجبات سريعه
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress         = {() => this.onSubCategories(3)}
                                    style           = {[ styles.paddingHorizontal_15, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, { backgroundColor : this.state.active === 3  ? '#d3292a' : '#f8dede' } ]}>
                                    <Text style     = {[ styles.textRegular, styles.textSize_12 , { color : this.state.active === 3 ? '#FFF' : '#a09f9f' }]} >
                                        وجبات محليه
                                    </Text>
                                </TouchableOpacity>

                            </ScrollView>
                        </View>

                        <View style={[ styles.Border, styles.border_gray, styles.paddingHorizontal_5, styles.paddingVertical_10, styles.marginVertical_10, styles.overHidden, styles.marginHorizontal_15 ]}>

                            <View style={[ styles.rowGroup,  ]}>
                                <View style={[ styles.rowGroup ]}>
                                    <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                        {i18n.t('editchef')} :
                                    </Text>
                                    <Text style={[styles.textRegular, styles.text_red, styles.textSize_13, styles.marginHorizontal_5]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                        شعوذه الندم
                                    </Text>
                                </View>
                                <View style={[ styles.rowGroup ]}>
                                    <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                        {i18n.t('monyproducer')}
                                    </Text>
                                    <Text style = {[styles.textRegular, styles.text_black, styles.textSize_12, styles.border_right, styles.paddingHorizontal_10, styles.marginHorizontal_5]}>
                                        10 ر.س
                                    </Text>
                                </View>
                                <View style={[ styles.rowGroup ]}>
                                    <Icon
                                        style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                        type    = "FontAwesome"
                                        name    = 'circle'
                                    />
                                    <Text style={[styles.textRegular, styles.text_green, styles.textSize_12]}>
                                        متواجد حاليا
                                    </Text>
                                </View>
                            </View>

                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                <View style={[ styles.width_50, styles.height_50, styles.flex_15 ]}>
                                    <Image style = {[styles.Width_100 , styles.height_full]} source={require('../../assets/img/girl.png')}/>
                                </View>
                                <View style={[ styles.paddingHorizontal_5, styles.flex_85 ]}>
                                    <View style={[ styles.rowGroup ]}>
                                        <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>{i18n.t('editchef')}</Text>
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_10]}>استلام من الشيف / علي حسب المسافه</Text>
                                    </View>
                                    <View style={[ styles.rowGroup ]}>
                                        <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>{i18n.t('eat')}</Text>
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_10]}>طماطم - بطاطس - خس - جبنة</Text>
                                    </View>
                                    <View style={[ styles.rowGroup ]}>
                                        <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>{i18n.t('timeeat')}</Text>
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_10]}>علي حسب التواجد / قبلها بـ 2 ساعة</Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_12, styles.rowLeft]}>
                                    يبعد 200.2 KM
                                </Text>
                            </View>

                            <View style={[ styles.rowGroup ]}>

                                <TouchableOpacity style={[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_5, styles.height_40]}>
                                    <Text style={[styles.textRegular, styles.text_White, styles.textSize_13]}>{i18n.t('addToCart')}</Text>
                                </TouchableOpacity>

                                <View style={[ styles.rowGroup ]}>
                                    <TouchableOpacity
                                        style       = {[styles.bg_light_red,styles.flexCenter, styles.paddingVertical_5, styles.paddingHorizontal_5]}
                                        onPress     = {() => this.incrementCount()}
                                    >
                                        <Icon
                                            style   = {[styles.text_red, styles.textSize_14]}
                                            type    = "AntDesign"
                                            name    = 'plus'
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.textRegular, styles.text_red, styles.textSize_13, styles.Border, styles.border_light_red, styles.width_40, styles.textCenter, styles.marginHorizontal_5]}>
                                        { this.state.count }
                                    </Text>
                                    <TouchableOpacity
                                        style       = {[styles.bg_light_gray, styles.flexCenter, styles.paddingVertical_5, styles.paddingHorizontal_5]}
                                        onPress     = {() => this.decrementCount()}
                                    >
                                        <Icon
                                            style   = {[styles.text_White, styles.textSize_14]}
                                            type    = "AntDesign"
                                            name    = 'minus'
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>

                        <View style={[ styles.Border, styles.border_gray, styles.paddingHorizontal_15, styles.paddingVertical_10, styles.marginVertical_10, styles.overHidden, styles.marginHorizontal_15 ]}>

                            <View style={[ styles.rowGroup  ]}>
                                <View style={[ styles.rowGroup ]}>
                                    <Text style={[styles.textRegular, styles.text_black, styles.textSize_13]}>
                                        برجر الندم
                                    </Text>
                                </View>
                                <View style={[ styles.rowGroup ]}>
                                    <Icon
                                        style   = {[styles.text_black_gray, styles.textSize_10, styles.marginHorizontal_5]}
                                        type    = "FontAwesome"
                                        name    = 'eye'
                                    />
                                    <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_12]}>
                                        145 مشاهده
                                    </Text>
                                </View>
                            </View>

                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                <Text style = {[styles.textRegular, styles.text_black_gray, styles.textSize_12]}>
                                    برجر - لحم - سلطه
                                </Text>
                            </View>

                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                <Text style = {[styles.textRegular, styles.text_black, styles.textSize_12]}>
                                    {i18n.translate('timeeat')}
                                </Text>
                            </View>

                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                <Text style = {[styles.textRegular, styles.text_black_gray, styles.textSize_12]}>
                                    1 ساعه
                                </Text>
                            </View>

                            <View style={[ styles.rowRight]}>
                                <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                    {i18n.t('monyproducer')}
                                </Text>
                                <Text style = {[styles.textRegular, styles.text_black, styles.textSize_12, styles.border_right, styles.paddingHorizontal_10, styles.marginHorizontal_5]}>
                                    10 ر.س
                                </Text>
                            </View>

                            <View style={[ styles.rowRight]}>
                                <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                    {i18n.t('monyproducer')}
                                </Text>
                                <Switch
                                    style           = {[ styles.switch, styles.marginHorizontal_25, styles.marginVertical_10 ]}
                                    onValueChange   = {this.toggleSwitch}
                                    value           = {this.state.switchValue}
                                    onTintColor     = {'#F00'}
                                    thumbTintColor  = {'#fff'}
                                    tintColor       = {'#DDD'}
                                    disabled
                                />
                            </View>

                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>

                            </View>

                        </View>

                        {/*<FlatList*/}
                        {/*    data                    = {this.renderItems}*/}
                        {/*    renderItem              = {(item) => this.renderItems(item)}*/}
                        {/*    numColumns              = {2}*/}
                        {/*    keyExtractor            = {this._keyExtractor}*/}
                        {/*    extraData               = {this.renderItems}*/}
                        {/*    onEndReachedThreshold   = {isIOS ? .01 : 1}*/}
                        {/*/>*/}

                        <View style={[ styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden, styles.Width_100 ]}>

                            <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <TouchableOpacity
                                        onPress     = {() => this.props.navigation.navigate('Details')}
                                        style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                        <View style = {[ styles.Width_100, styles.position_R ]}>
                                            <Image style        = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/1.png')}/>
                                            <View style         = {[ styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup ]}>
                                                <View style     = {[ styles.rowRight ]}>
                                                    <Icon
                                                        style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                        type    = "FontAwesome"
                                                        name    = 'circle'
                                                    />
                                                    <Text style={[styles.textRegular, styles.text_White, styles.textSize_10]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                        اسم الشيف
                                                    </Text>
                                                </View>
                                                <TouchableOpacity>
                                                    <Icon
                                                        style       = {[styles.text_gray, styles.textSize_20]}
                                                        type        = "MaterialIcons"
                                                        name        = 'favorite-border'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                                <StarRating
                                                    disabled        = {true}
                                                    maxStars        = {5}
                                                    rating          = {3}
                                                    fullStarColor   = {COLORS.red}
                                                    starSize        = {12}
                                                    starStyle       = {styles.starStyle}
                                                />
                                            </View>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                                <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25 كم</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>

                            <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <TouchableOpacity
                                        onPress     = {() => this.props.navigation.navigate('Details')}
                                        style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                        <View style = {[ styles.Width_100, styles.position_R ]}>
                                            <Image style        = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/2.png')}/>
                                            <View style         = {[ styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup ]}>
                                                <View style     = {[ styles.rowRight ]}>
                                                    <Icon
                                                        style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                        type    = "FontAwesome"
                                                        name    = 'circle'
                                                    />
                                                    <Text style={[styles.textRegular, styles.text_White, styles.textSize_10]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                        اسم الشيف
                                                    </Text>
                                                </View>
                                                <TouchableOpacity>
                                                    <Icon
                                                        style       = {[styles.text_gray, styles.textSize_20]}
                                                        type        = "MaterialIcons"
                                                        name        = 'favorite-border'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                                <StarRating
                                                    disabled        = {true}
                                                    maxStars        = {5}
                                                    rating          = {3}
                                                    fullStarColor   = {COLORS.red}
                                                    starSize        = {12}
                                                    starStyle       = {styles.starStyle}
                                                />
                                            </View>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                                <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25 كم</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>

                            <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <TouchableOpacity
                                        onPress     = {() => this.props.navigation.navigate('Details')}
                                        style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                        <View style = {[ styles.Width_100, styles.position_R ]}>
                                            <Image style        = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/3.png')}/>
                                            <View style         = {[ styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup ]}>
                                                <View style     = {[ styles.rowRight ]}>
                                                    <Icon
                                                        style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                        type    = "FontAwesome"
                                                        name    = 'circle'
                                                    />
                                                    <Text style={[styles.textRegular, styles.text_White, styles.textSize_10]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                        اسم الشيف
                                                    </Text>
                                                </View>
                                                <TouchableOpacity>
                                                    <Icon
                                                        style       = {[styles.text_gray, styles.textSize_20]}
                                                        type        = "MaterialIcons"
                                                        name        = 'favorite-border'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                                <StarRating
                                                    disabled        = {true}
                                                    maxStars        = {5}
                                                    rating          = {3}
                                                    fullStarColor   = {COLORS.red}
                                                    starSize        = {12}
                                                    starStyle       = {styles.starStyle}
                                                />
                                            </View>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                                <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25 كم</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>

                            <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <TouchableOpacity
                                        onPress     = {() => this.props.navigation.navigate('Details')}
                                        style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                        <View style = {[ styles.Width_100, styles.position_R ]}>
                                            <Image style        = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/4.png')}/>
                                            <View style         = {[ styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup ]}>
                                                <View style     = {[ styles.rowRight ]}>
                                                    <Icon
                                                        style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                        type    = "FontAwesome"
                                                        name    = 'circle'
                                                    />
                                                    <Text style={[styles.textRegular, styles.text_White, styles.textSize_10]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                        اسم الشيف
                                                    </Text>
                                                </View>
                                                <TouchableOpacity>
                                                    <Icon
                                                        style       = {[styles.text_gray, styles.textSize_20]}
                                                        type        = "MaterialIcons"
                                                        name        = 'favorite-border'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                                <StarRating
                                                    disabled        = {true}
                                                    maxStars        = {5}
                                                    rating          = {3}
                                                    fullStarColor   = {COLORS.red}
                                                    starSize        = {12}
                                                    starStyle       = {styles.starStyle}
                                                />
                                            </View>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                                <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25 كم</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>

                        </View>

                        <View style={[ styles.position_R, styles.marginHorizontal_20, styles.marginVertical_10 ]}>

                            <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full ]} />

                            <View style={[ styles.Border, styles.border_gray, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.bg_White ]}>
                                <View style={[ styles.rowGroup ]}>
                                    <View style={[ styles.rowGroup ]}>
                                        <Text style={[styles.textBold, styles.text_black, styles.textSize_13]}>
                                            {i18n.t('comments')} :
                                        </Text>
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                            ( 44 )
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={[ styles.rowGroup ]} onPress={() => this.toggleModalComment()}>
                                        <Text style={[styles.textRegular, styles.text_red, styles.textSize_13, styles.marginHorizontal_5]}>
                                            {i18n.t('addComment')}
                                        </Text>
                                        <View style={[ styles.paddingHorizontal_5, styles.paddingVertical_5 , styles.flexCenter, styles.bg_light_red ]}>
                                            <Icon
                                                style   = {[styles.text_red, styles.textSize_20]}
                                                type    = "AntDesign"
                                                name    = 'plus'
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[ styles.rowGroup, styles.marginVertical_10 ]}>
                                    <View style={[ styles.flex_15, styles.overHidden, styles.flexCenter ]}>
                                        <Image style = {[styles.width_40 , styles.height_40, styles.Border, styles.border_red, styles.Radius_100]} source={require('../../assets/img/girl.png')}/>
                                    </View>
                                    <View style={[ styles.flex_85 ]}>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13]}>
                                                شعوذه الندم
                                            </Text>
                                            <StarRating
                                            disabled        = {true}
                                            maxStars        = {5}
                                            rating          = {3}
                                            fullStarColor   = {COLORS.red}
                                            starSize        = {12}
                                            starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_13]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                            حبيبي عمر عذابك ف الآخره
                                        </Text>
                                    </View>
                                </View>
                                <View style={[ styles.rowGroup, styles.marginVertical_10 ]}>
                                    <View style={[ styles.flex_15, styles.overHidden, styles.flexCenter ]}>
                                        <Image style = {[styles.width_40 , styles.height_40, styles.Border, styles.border_red, styles.Radius_100]} source={require('../../assets/img/girl.png')}/>
                                    </View>
                                    <View style={[ styles.flex_85 ]}>
                                        <View style={[ styles.rowGroup]}>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13]}>
                                                شعوذه الندم
                                            </Text>
                                            <StarRating
                                                disabled        = {true}
                                                maxStars        = {5}
                                                rating          = {3}
                                                fullStarColor   = {COLORS.red}
                                                starSize        = {12}
                                                starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_13]}>
                                            حبيبي عمر عذابك ف الآخره
                                        </Text>
                                    </View>
                                </View>
                                <View style={[ styles.rowGroup, styles.marginVertical_10 ]}>
                                    <View style={[ styles.flex_15, styles.overHidden, styles.flexCenter ]}>
                                        <Image style = {[styles.width_40 , styles.height_40, styles.Border, styles.border_red, styles.Radius_100]} source={require('../../assets/img/girl.png')}/>
                                    </View>
                                    <View style={[ styles.flex_85 ]}>
                                        <View style={[ styles.rowGroup]}>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13]}>
                                                شعوذه الندم
                                            </Text>
                                            <StarRating
                                                disabled        = {true}
                                                maxStars        = {5}
                                                rating          = {3}
                                                fullStarColor   = {COLORS.red}
                                                starSize        = {12}
                                                starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_13]}>
                                            حبيبي عمر عذابك ف الآخره
                                        </Text>
                                    </View>
                                </View>
                                <View style={[ styles.rowGroup, styles.marginVertical_10 ]}>
                                    <View style={[ styles.flex_15, styles.overHidden, styles.flexCenter ]}>
                                        <Image style = {[styles.width_40 , styles.height_40, styles.Border, styles.border_red, styles.Radius_100]} source={require('../../assets/img/girl.png')}/>
                                    </View>
                                    <View style={[ styles.flex_85 ]}>
                                        <View style={[ styles.rowGroup]}>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13]}>
                                                شعوذه الندم
                                            </Text>
                                            <StarRating
                                                disabled        = {true}
                                                maxStars        = {5}
                                                rating          = {3}
                                                fullStarColor   = {COLORS.red}
                                                starSize        = {12}
                                                starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_13]}>
                                            حبيبي عمر عذابك ف الآخره
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <Modal isVisible={this.state.isModalComment} onBackdropPress={() => this.toggleModalComment()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

                                <View style={[styles.paddingVertical_15]}>
                                    <Text style={[styles.textBold, styles.text_black, styles.textSize_16, styles.textLeft , styles.SelfCenter]}>
                                        {i18n.t('comment')}
                                    </Text>
                                </View>

                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                                    <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                        <View style={[styles.rowGroup, styles.Width_100]}>
                                            <View style={[styles.position_R, styles.flex_1, styles.paddingHorizontal_10, styles.height_100]}>
                                                <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full ]} />
                                                <Textarea
                                                    placeholder         = {i18n.t('addComment')}
                                                    onChangeText        = {(comment) => this.setState({comment})}
                                                    style               = {[styles.textArea, styles.height_100, styles.paddingVertical_10, styles.bg_White, styles.Border, styles.border_gray]}
                                                />
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() => this.increment2()} style={[ styles.bg_light_red, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5 ]}>
                                                    <Icon type={'Entypo'} name={'plus'} style={[ styles.text_red, styles.textSize_14 ]}/>
                                                </TouchableOpacity>
                                                <View style={[styles.Border, styles.border_red, styles.paddingHorizontal_5, styles.paddingVertical_5]}>
                                                    <Text style={[styles.text_red, styles.textRegular, styles.textSize_14]}>{this.state.value2}</Text>
                                                    <Icon style={[styles.text_red, styles.textSize_14]} type="AntDesign" name='star'/>
                                                </View>
                                                <TouchableOpacity onPress={() => this.decrement2()} style={[ styles.bg_light_gray, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5 ]}>
                                                    <Icon type={'Entypo'} name={'minus'} style={[ styles.text_White, styles.textSize_14 ]}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_red, styles.textCenter]}>{ this.state.Error }</Text>

                                        <TouchableOpacity
                                            style       = {[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40]}
                                            onPress     = {() => this.sentComment()}>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                                {i18n.translate('addComment')}
                                            </Text>
                                        </TouchableOpacity>

                                    </Form>

                                </View>

                            </View>
                        </Modal>

                    </View>

                </Content>

            </Container>

        );
    }
}

export default Details;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
