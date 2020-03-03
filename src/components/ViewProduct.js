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

class ViewProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            switchValue             : true,
            isModalComment          : false,
            value2                  : 1,
            Error                   : '',
            comment                 : '',
        }
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

    componentWillMount() {

        this.setState({spinner: true});

    }


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
                        <Title style={[styles.textRegular , styles.text_red, styles.textSize_16, styles.textLeft, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                            صفحه المنتج الواحد
                        </Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button style={styles.Button} transparent onPress={()=> this.onShare()} >
                            <Image style={[styles.headImage]} source={require('../../assets/img/share.png')} resizeMode={'contain'}/>
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0 ]}/>

                    <View style={[ styles.boxUser ]}>

                        <View style={[ styles.position_R, styles.overHidden ]}>
                            <Animatable.View animation="fadeIn" easing="ease-out" delay={500} style = {[styles.width_40 , styles.height_40, styles.position_A, styles.top_25, styles.left_0, styles.zIndex, styles.overlay_black]}>
                                <TouchableOpacity style = {[ styles.width_40 , styles.height_40, styles.flexCenter ]}>
                                    <Icon style = {[styles.text_White, styles.textSize_18]} type="AntDesign" name='edit' />
                                </TouchableOpacity>
                            </Animatable.View>
                            <Swiper
                                containerStyle      = {[styles.Width_95, styles.marginVertical_15, styles.height_200, styles.viewBlock]}
                                autoplay            = {true}
                                paginationStyle     = {[styles.paginationStyle]}
                                dotStyle            = {{borderRadius : 0, height : 10, width: 4, backgroundColor: '#DDD'}}
                                activeDotStyle      = {{ backgroundColor: '#F00', width: 4, borderRadius : 0, height : 25}}
                                animated            = {true}
                                loop                = {true}
                                autoplayTimeout     = { 2 }>

                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_95, styles.height_200]} source={require('../../assets/img/4.png')}/>
                                </View>

                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_95, styles.height_200]} source={require('../../assets/img/2.png')}/>
                                </View>

                            </Swiper>

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

export default ViewProduct;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
