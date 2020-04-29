import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    Share,
    Switch,
    ActivityIndicator, Linking
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
    CheckBox, Form, Textarea
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {productDetails , changeMealStatus , setFav , addComment , addCart} from "../actions";
import COLORS from "../consts/colors";
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";
import Product from './Product'
import Spinner from "react-native-loading-spinner-overlay";
import {NavigationEvents} from "react-navigation";
import SearchInput from './SearchInput'
import ProgressImg from 'react-native-image-progress';

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
            isShowComments          : false,
            isModalSelect           : false,
            active                  : 1,
            count                   : 1,
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
            longitude               : null,
            loader: true,
            isFav: false,
            isSubmitted: false,
        }
    }

    toggleFavorite (id){
        this.setState({ isFav: ! this.state.isFav });
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.setFav( this.props.lang, id  , token );
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

    getLocation(){

        this.props.navigation.navigate('MapLocation', {
            pageName : this.props.navigation.state.routeName
        });

        this.setState({ isModalFilter   : false});

    }

    onSubCategories ( id ){
        this.setState({spinner: true, active : id });
    }

    toggleModalFilter = () => {
        this.setState({ isModalFilter   : !this.state.isModalFilter});
    };

    toggleModalRate = () => {
        this.setState({ isModalRate     : !this.state.isModalRate});
    };

    toggleModalSallery = () => {
        this.setState({ isModalSallery  : !this.state.isModalSallery});
    };

    selectRateId(id, name) {
        this.setState({
            reteId      : id,
            rate        : name
        });
        this.setState({ isModalRate     : !this.state.isModalRate});
    }

    selectSellaryId(id, name) {
        this.setState({
            SalleryId    : id,
            Sallery      : name
        });
        this.setState({ isModalSallery  : !this.state.isModalSallery});
    }


    incrementCount(){
        this.setState({count: this.state.count + 1});
    }
    decrementCount(){
        this.setState({count: this.state.count - 1});
    }

    toggleModalComment = () => {
		this.setState({ isShowComments  : false});

		setTimeout(() => this.setState({ isModalComment  : !this.state.isModalComment}), 50);

    };

    toggleShowComments = () => {
        this.setState({ isShowComments  : !this.state.isShowComments});
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

    sentComment(id){

        const err = this.validate();

        if (!err){
            this.props.addComment(this.props.lang, id, this.state.value2 , this.state.comment ,  this.props.auth.data.latitude , this.props.auth.data.longitude , this.props.user.token);
            this.setState({ isModalComment  : !this.state.isModalComment, Error : '', comment : '', value2: 1});
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
        this.setState({loader: true});
        const token = this.props.user ? this.props.user.token : null;
        this.props.productDetails(this.props.lang, this.props.navigation.state.params.meal_id, this.props.auth.data.latitude , this.props.auth.data.longitude , token);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isSubmitted: false ,loader: false  , isFav: nextProps.mealInfo.is_favourite});

		if( nextProps.navigation.state.params !== undefined && nextProps.navigation.state.params.pageName === 'MapLocation'){
			const { city_name, latitude, longitude } = nextProps.navigation.state.params;
			this.setState({isModalFilter   : true, cityName: city_name, latitude, longitude});
		}else{
			this.setState({cityName  : i18n.translate('mapname')});
		}

		this.setState({ spinner : false});
    }

    renderLoader(){
        if (this.state.loader){
            return(
                <View style={[styles.loading, styles.flexCenter]}>
                    <ActivityIndicator size="large" color={COLORS.red} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('home')}</Text>) ,
        drawerIcon      : (<Image style={[styles.headImage]} source={require('../../assets/img/home.png')} resizeMode={'contain'}/>)
    });

	onSearch(){
		this.setState({ isModalFilter : false});

		const { SalleryId, rateId, latitude, longitude } = this.state;
		this.props.navigation.navigate('FilterSearch', { pageName : this.props.navigation.state.routeName, SalleryId, rateId, latitude, longitude });
	}

    rerunAction (id) {
        this.setState({loader: true});
        this.props.productDetails(this.props.lang, id, this.props.auth.data.latitude , this.props.auth.data.longitude);
    }

    renderComments(review, i){
        return(
            <View key={i} style={[styles.rowGroup, styles.marginVertical_10]}>
                <View
                    style={[styles.flex_15, styles.overHidden, styles.flexCenter]}>
                    <ProgressImg style={[styles.width_40, styles.height_40, styles.Border, styles.border_red, styles.Radius_100]} source={{uri:review.avatar}}/>
                </View>
                <View style={[styles.flex_85]}>
                    <View style={[styles.rowGroup]}>
                        <Text
                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_13]}>
                            {review.name}
                        </Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={review.rate}
                            fullStarColor={COLORS.red}
                            starSize={12}
                            starStyle={styles.starStyle}
                        />
                    </View>
                    <Text
                        style={[styles.textRegular, styles.text_black, styles.textSize_13 ,{alignSelf:"flex-start"}]}>
                        {review.comment}
                    </Text>
                </View>
            </View>
        )

    }

    renderAddToCart(){
        if (this.state.isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.flexCenter , styles.marginVertical_15]}>
                    <ActivityIndicator size="large" color={COLORS.red} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => this.addToCart(this.props.mealInfo.id)} style={[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_5, styles.height_40]}>
                <Text style={[styles.textRegular, styles.text_White, styles.textSize_13]}>{i18n.t('addToCart')}</Text>
            </TouchableOpacity>
        );
    }

    addToCart(id) {
        this.setState({ isSubmitted: true });
        const token = this.props.user ? this.props.user.token : null;
        this.props.addCart(this.props.lang, id , this.props.mealInfo.provider.id , this.state.count , token,  this.props);
    }

    onFocus(){
        this.componentWillMount();
    }
    render() {

        return (
            <Container>
                { this.renderLoader() }
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Image style={[styles.headImage]} source={require('../../assets/img/left.png')} resizeMode={'contain'}/>
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

						<Modal avoidKeyboard={true} isVisible={this.state.isModalFilter} onBackdropPress={() => this.toggleModalFilter()} style={[ styles.bottomCenter, styles.Width_100 ]}>
							<View style={[styles.overHidden, styles.bg_White, styles.flexCenter , styles.Width_100, styles.position_R, styles.top_45 , {height:500 , paddingTop:40}]}>

								<View style={[styles.paddingVertical_15]}>
									<Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textLeft , styles.SelfCenter]}>
										{i18n.t('searchchef')}
									</Text>
								</View>

								<View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
									<KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
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
												onPress     = {() => this.onSearch()}>
												<Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
													{i18n.translate('search')}
												</Text>
											</TouchableOpacity>

										</Form>
									</KeyboardAvoidingView>
								</View>
							</View>

							<Modal avoidKeyboard={true} isVisible={this.state.isModalRate} onBackdropPress={() => this.toggleModalRate()}>
								<View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>

									<View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>
										<Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
											{i18n.t('starrate')}
										</Text>
									</View>

									<View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
										<TouchableOpacity
											style               = {[styles.rowGroup, styles.marginVertical_10]}
											onPress             = {() => this.selectRateId('heigh', i18n.t('topRated'))}
										>
											<View style={[styles.overHidden, styles.rowRight]}>
												<CheckBox
													style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
													color               = {styles.text_red}
													selectedColor       = {styles.text_red}
													onPress             = {() => this.selectRateId('heigh', i18n.t('topRated'))}
													checked             = {this.state.rateId === 'heigh'}
												/>
												<Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
													{i18n.t('topRated')}
												</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity
											style               = {[styles.rowGroup, styles.marginVertical_10]}
											onPress             = {() => this.selectRateId('low', i18n.t('lowRated'))}
										>
											<View style={[styles.overHidden, styles.rowRight]}>
												<CheckBox
													style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
													color               = {styles.text_red}
													onPress             = {() => this.selectRateId('low', i18n.t('lowRated'))}
													selectedColor       = {styles.text_red}
													checked             = {this.state.rateId === 'low'}
												/>
												<Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
													{i18n.t('lowRated')}
												</Text>
											</View>
										</TouchableOpacity>
									</View>

								</View>
							</Modal>

							<Modal avoidKeyboard={true} isVisible={this.state.isModalSallery} onBackdropPress={() => this.toggleModalSallery()}>
								<View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>

									<View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>
										<Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
											{i18n.t('price')}
										</Text>
									</View>

									<View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
										<TouchableOpacity
											style               = {[styles.rowGroup, styles.marginVertical_10]}
											onPress             = {() => this.selectSellaryId('heigh', i18n.t('topPrice'))}
										>
											<View style={[styles.overHidden, styles.rowRight]}>
												<CheckBox
													style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
													color               = {styles.text_red}
													selectedColor       = {styles.text_red}
													onPress             = {() => this.selectSellaryId('heigh', i18n.t('topPrice'))}
													checked             = {this.state.SalleryId === 'heigh'}
												/>
												<Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
													{i18n.t('topPrice')}
												</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity
											style               = {[styles.rowGroup, styles.marginVertical_10]}
											onPress             = {() => this.selectSellaryId('low', i18n.t('lowPrice'))}
										>
											<View style={[styles.overHidden, styles.rowRight]}>
												<CheckBox
													style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
													color               = {styles.text_red}
													selectedColor       = {styles.text_red}
													onPress             = {() => this.selectSellaryId('low', i18n.t('lowPrice'))}
													checked             = {this.state.SalleryId === 'low'}
												/>
												<Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
													{i18n.t('lowPrice')}
												</Text>
											</View>
										</TouchableOpacity>
									</View>

								</View>
							</Modal>
						</Modal>

                        <View style={[ styles.position_R, styles.overHidden ]}>
                            <Animatable.View animation="fadeIn" easing="ease-out" delay={500} style = {[styles.width_40 , styles.height_40, styles.position_A, styles.top_15, styles.right_35, styles.zIndex, styles.overlay_black]}>
                                <TouchableOpacity onPress = {() => this.toggleFavorite(this.props.mealInfo.id)}
                                style = {[ styles.width_40 , styles.height_40, styles.flexCenter ]}>
                                    <Icon style = {[this.state.isFav ? styles.text_red : styles.text_gray, styles.textSize_18]} type="AntDesign"  name={this.state.isFav ? 'heart' : 'hearto'} />
                                </TouchableOpacity>
                            </Animatable.View>

							{
								this.props.mealInfo ?
									<Swiper
										containerStyle      = {[styles.Width_95, styles.marginVertical_15, styles.height_120, styles.viewBlock]}
										autoplay            = {true}
										paginationStyle     = {[styles.paginationStyle]}
										dotStyle            = {{borderRadius : 0, height : 10, width: 4, backgroundColor: '#DDD'}}
										activeDotStyle      = {{ backgroundColor: '#F00', width: 4, borderRadius : 0, height : 25}}
										animated            = {true}
										loop                = {true}
										autoplayTimeout     = { 2 }>


										{
											this.props.mealInfo.images ?
												this.props.mealInfo.images.map((img , i) => (
													<View key={i} style={[styles.viewBlock]}>
														<ProgressImg style={[styles.Width_95, styles.height_120]} source={{uri: img.image}}/>
														<Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.position_A , styles.left_0, styles.bottom_0 , styles.Width_95, styles.overlay_black]}>
															<View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
																<Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
																	{this.props.mealInfo.title}
																</Text>
															</View>
														</Animatable.View>
													</View>
												)) : null
										}

									</Swiper> : null
							}

                        </View>


                        <View style={[ styles.Border, styles.border_gray, styles.paddingHorizontal_5, styles.paddingVertical_10, styles.marginVertical_10, styles.overHidden, styles.marginHorizontal_15 ]}>

                            {
								this.props.mealInfo && this.props.mealInfo.provider ?
                                    <View style={[ styles.rowGroup,  ]}>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                                {i18n.t('editchef')} :
                                            </Text>
                                            <Text style={[styles.textRegular, styles.text_red, styles.textSize_13, styles.marginHorizontal_5]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                {this.props.mealInfo.provider.name}
                                            </Text>
                                        </View>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                                {i18n.t('monyproducer')}
                                            </Text>
                                            <Text style = {[styles.textRegular, styles.text_black, styles.textSize_12, styles.border_right, styles.paddingHorizontal_10, styles.marginHorizontal_5]}>
                                                {this.props.mealInfo.price} {i18n.t('RS')}
                                            </Text>
                                        </View>
                                        <View style={[ styles.rowGroup ]}>
                                            <Icon
                                                style   = {[this.props.mealInfo.available ? styles.text_green : styles.text_red, styles.textSize_5, styles.marginHorizontal_5]}
                                                type    = "FontAwesome"
                                                name    = 'circle'
                                            />
                                            <Text style={[styles.textRegular, this.props.mealInfo.provider.available ? styles.text_green : styles.text_red, styles.textSize_12]}>
                                                {this.props.mealInfo.provider.available ? i18n.t('available') : i18n.t('notAvailable')}
                                            </Text>
                                        </View>
                                    </View>
                                    :
                                    null
                            }

                            {
								this.props.mealInfo && this.props.mealInfo.provider ?
                                    <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                        <View style={[ styles.width_50, styles.height_50, styles.flex_15 ]}>
                                            <ProgressImg style = {[styles.Width_100 , styles.height_full]} source={{uri:this.props.mealInfo.provider.avatar}}/>
                                        </View>
                                        <View style={[ styles.paddingHorizontal_5, styles.flex_85 ]}>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>{i18n.t('delver')}</Text>
                                                <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_10, { textAlign: 'left', marginHorizontal: 5, flex: 1 }]}>{this.props.mealInfo.provider.delivery_type}</Text>
                                            </View>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>{i18n.t('eat')}</Text>
                                                <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_10, { textAlign: 'left', marginHorizontal: 5, flex: 1 }]}>{this.props.mealInfo.additions}</Text>
                                            </View>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>{i18n.t('timeeat')}</Text>
                                                <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_10, { textAlign: 'left', marginHorizontal: 5, flex: 1 }]}>{this.props.mealInfo.preparation_time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }

							{
								this.props.mealInfo && this.props.mealInfo.distance ?
									<View>
										<Text style={[styles.textRegular, styles.text_black, styles.textSize_12, styles.rowLeft]}>
											{ i18n.t('far') + this.props.mealInfo.distance}
										</Text>
									</View> : null
							}

                            {
								this.props.mealInfo && this.props.mealInfo.available ?
                                    <View style={[ styles.rowGroup ]}>

                                        { this.renderAddToCart() }

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
                                    :
                                    null
                            }
                        </View>

                        <View style={[ styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden, styles.Width_100 ]}>

                            {
								this.props.mealInfo && this.props.mealInfo.recommended ?
                                    this.props.mealInfo.recommended.map((meal, i) => (
                                        <Product key={meal.id} data={meal} navigation={this.props.navigation} rerunAction={(id) => this.rerunAction(id)} type={'mealDetails'}/>
                                    ))
                                    :
                                    null
                            }

                        </View>

                        <View style={[styles.position_R, styles.marginHorizontal_20, styles.marginVertical_10]}>

                            <View
                                style={[styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full]}/>

                            <View
                                style={[styles.Border, styles.border_gray, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.bg_White , {maxHeight:100 , overflow:'hidden'}]}>
                                <View style={[styles.rowGroup]}>
                                    <View style={[styles.rowGroup]}>
                                        <Text style={[styles.textBold, styles.text_black, styles.textSize_13]}>
                                            {i18n.t('comments')} :
                                        </Text>
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                             {this.props.mealInfo && this.props.mealInfo.reviews_count ? this.props.mealInfo.reviews_count : null}
                                        </Text>
                                    </View>
                                    {
										this.props.mealInfo && this.props.mealInfo.reviews && this.props.mealInfo.reviews.length !== 0 ?
                                            <TouchableOpacity onPress={() => this.toggleShowComments()} style={[styles.height_30, styles.width_30, styles.Radius_30, styles.bg_red,
                                                {justifyContent:'center', alignItems:'center'}]}>
                                                <Icon style={[styles.text_White, styles.textSize_18]} type={'AntDesign'} name={'up'}/>
                                            </TouchableOpacity>
                                            :
                                            null
                                    }
                                    {
                                        this.props.user ?
                                            <TouchableOpacity style={[styles.rowGroup]} onPress={() => this.toggleModalComment()}>
                                                <Text
                                                    style={[styles.textRegular, styles.text_red, styles.textSize_13, styles.marginHorizontal_5]}>
                                                    {i18n.t('addComment')}
                                                </Text>
                                                <View
                                                    style={[styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.bg_light_red]}>
                                                    <Icon
                                                        style={[styles.text_red, styles.textSize_20]}
                                                        type="AntDesign"
                                                        name='plus'
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            :
                                           null
                                    }


                                </View>
                                {
									this.props.mealInfo && this.props.mealInfo.reviews ?
                                        this.props.mealInfo.reviews.map((review, i) => (
                                            this.renderComments(review, i)
                                        ))
                                        :
                                        null
                                }

                            </View>
                        </View>

						<Modal avoidKeyboard={true} isVisible={this.state.isModalComment} onBackdropPress={() => this.toggleModalComment()} style={[ styles.bottomCenter, styles.Width_100 ]}>
							<View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

								<View style={[styles.paddingVertical_15]}>
									<Text style={[styles.textBold, styles.text_black, styles.textSize_16, styles.textLeft , styles.SelfCenter]}>
										{i18n.t('comment')}
									</Text>
								</View>

								<View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
									<KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
										<Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

											<View style={[styles.rowGroup, styles.Width_100]}>
												<View style={[styles.position_R, styles.flex_1, styles.paddingHorizontal_10, styles.height_100]}>
													<View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full ]} />
													<Textarea
														placeholder         = {i18n.t('addComment')}
														onChangeText        = {(comment) => this.setState({comment})}
														style               = {[styles.textArea, styles.height_100, styles.paddingVertical_10, styles.bg_White, styles.Border, styles.border_gray]}
														autoCapitalize      ='none'
														value               ={this.state.comment}
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
												onPress     = {() => this.sentComment(this.props.mealInfo.id)}>
												<Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
													{i18n.translate('addComment')}
												</Text>
											</TouchableOpacity>

										</Form>
									</KeyboardAvoidingView>
								</View>

							</View>
						</Modal>

						<Modal avoidKeyboard={true} isVisible={this.state.isShowComments} onBackdropPress={() => this.toggleShowComments()} style={[styles.bottomCenter, styles.Width_100]}>
							{
								this.props.mealInfo ?
									<View
										style={[styles.overHidden, styles.bg_White, styles.Width_100, styles.position_R, styles.top_20 , styles.paddingVertical_25]}>

										<View style={[styles.position_R, styles.marginHorizontal_20, styles.marginVertical_10]}>

											<View
												style={[styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full]}/>

											<View
												style={[styles.Border, styles.border_gray, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.bg_White]}>
												<View style={[styles.rowGroup]}>
													<View style={[styles.rowGroup]}>
														<Text style={[styles.textBold, styles.text_black, styles.textSize_13]}>
															{i18n.t('comments')} :
														</Text>
														<Text
															style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
															 {this.props.mealInfo.reviews_count ? this.props.mealInfo.reviews_count : null}
														</Text>
													</View>

													{
														this.props.user &&  this.props.user.type === 'user' ?
															<TouchableOpacity style={[styles.rowGroup]}
																onPress={() => this.toggleModalComment()}>
																<Text
																	style={[styles.textRegular, styles.text_red, styles.textSize_13, styles.marginHorizontal_5]}>
																	{i18n.t('addComment')}
																</Text>
																<View
																	style={[styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.bg_light_red]}>
																	<Icon
																		style={[styles.text_red, styles.textSize_20]}
																		type="AntDesign"
																		name='plus'
																	/>
																</View>
															</TouchableOpacity>
															:
															null
													}
												</View>
												{
													this.props.mealInfo && this.props.mealInfo.reviews ?
														this.props.mealInfo.reviews.map((review, i) => (
															this.renderComments(review, i)
														))
														:
														null
												}
											</View>
										</View>

									</View> : null

							}

						</Modal>
                    </View>
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ auth, profile, lang , mealInfo}) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang,
        mealInfo: mealInfo.mealInfo,
    };
};
export default connect(mapStateToProps, {productDetails , changeMealStatus , setFav , addComment , addCart})(Details);
