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

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                 : false,
        }
    }

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
                            { i18n.t('basket') }
                        </Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0, styles.zIndexDown ]}/>

                    <View style={[ styles.position_R, styles.zIndex, { top : -30 } ]}>

                        <View style={[ styles.Width_90, styles.flexCenter, styles.marginVertical_30 ]}>
                            <View style={[ styles.marginVertical_10 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                    <TouchableOpacity onPress     = {() => this.props.navigation.navigate('DetailsCart')}>
                                        <View style={[ styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                            <View style={[ styles.height_70 , styles.flex_25, styles.overHidden, styles.flexCenter, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                                <Image style = {[styles.Width_100 , styles.height_70]} source={require('../../assets/img/1.png')}/>
                                            </View>
                                            <View style={[ styles.flex_75 ]}>
                                                <View style={[ styles.rowGroup]}>
                                                    <Text style={[styles.textRegular, styles.text_red, styles.textSize_13, styles.paddingHorizontal_5]}>
                                                        شعوذه الندم
                                                    </Text>
                                                </View>
                                                <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, styles.paddingHorizontal_5]}>
                                                    تصنيف القسم
                                                </Text>
                                                <View style={[ styles.rowRight]}>
                                                    <Icon style={[styles.textSize_12, styles.text_black_gray, styles.marginHorizontal_5]} type="Feather" name='map-pin' />
                                                    <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                                        شارع الندم التخصصي
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>
                            <View style={[ styles.marginVertical_10 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                    <TouchableOpacity onPress     = {() => this.props.navigation.navigate('DetailsCart')}>
                                        <View style={[ styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                            <View style={[ styles.height_70 , styles.flex_25, styles.overHidden, styles.flexCenter, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                                <Image style = {[styles.Width_100 , styles.height_70]} source={require('../../assets/img/2.png')}/>
                                            </View>
                                            <View style={[ styles.flex_75 ]}>
                                                <View style={[ styles.rowGroup]}>
                                                    <Text style={[styles.textRegular, styles.text_red, styles.textSize_13, styles.paddingHorizontal_5]}>
                                                        شعوذه الندم
                                                    </Text>
                                                </View>
                                                <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, styles.paddingHorizontal_5]}>
                                                    تصنيف القسم
                                                </Text>
                                                <View style={[ styles.rowRight]}>
                                                    <Icon style={[styles.textSize_12, styles.text_black_gray, styles.marginHorizontal_5]} type="Feather" name='map-pin' />
                                                    <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                                        شارع الندم التخصصي
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>
                            <View style={[ styles.marginVertical_10 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                    <TouchableOpacity onPress     = {() => this.props.navigation.navigate('DetailsCart')}>
                                        <View style={[ styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                            <View style={[ styles.height_70 , styles.flex_25, styles.overHidden, styles.flexCenter, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                                <Image style = {[styles.Width_100 , styles.height_70]} source={require('../../assets/img/3.png')}/>
                                            </View>
                                            <View style={[ styles.flex_75 ]}>
                                                <View style={[ styles.rowGroup]}>
                                                    <Text style={[styles.textRegular, styles.text_red, styles.textSize_13, styles.paddingHorizontal_5]}>
                                                        شعوذه الندم
                                                    </Text>
                                                </View>
                                                <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, styles.paddingHorizontal_5]}>
                                                    تصنيف القسم
                                                </Text>
                                                <View style={[ styles.rowRight]}>
                                                    <Icon style={[styles.textSize_12, styles.text_black_gray, styles.marginHorizontal_5]} type="Feather" name='map-pin' />
                                                    <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                                        شارع الندم التخصصي
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>
                        </View>

                    </View>

                </Content>

            </Container>

        );
    }
}

export default Cart;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
