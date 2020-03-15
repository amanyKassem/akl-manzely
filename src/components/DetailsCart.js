import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, ScrollView,} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Icon,
    Body,
    Title, CheckBox,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {getCartInfo , getDeliveryTypes} from "../actions";
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import COLORS from "../consts/colors";

class DetailsCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            loader                      : true,
            count                       : 0,
            delivery                    : i18n.t('delver'),
            deliveryId                  : null,
            isModalDelivery             : false,

        }
    }

    componentWillMount() {
        this.setState({loader: true});
        const provider_id = this.props.navigation.state.params.provider_id;
        this.props.getCartInfo(this.props.lang , provider_id , this.props.user.token);
        this.props.getDeliveryTypes(this.props.lang);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({loader: false});
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
    incrementCount(){
        this.setState({count: this.state.count + 1});
    }
    decrementCount(){
        this.setState({count: this.state.count - 1});
    }

    toggleModalDelivery = () => {
        this.setState({ isModalDelivery: !this.state.isModalDelivery});
    };

    selectDeliveryId(id, name) {
        this.setState({
            deliveryId      : id,
            delivery        : name
        });
        this.setState({ isModalDelivery: !this.state.isModalDelivery});
    }

    getLocation(){

        this.props.navigation.navigate('MapLocation', {
            pageName : this.props.navigation.state.routeName
        });

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

    render() {

        return (
            <Container>
                { this.renderLoader() }
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

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_80, styles.right_0, styles.top_0 ]}/>

                    <View style={[ styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden, styles.Width_100 ]}>

                        <View style={[ styles.Width_45, styles.marginHorizontal_5, styles.marginVertical_10 ]}>
                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.Width_100, styles.position_R ]}>
                                <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                <View style = {[styles.position_R, styles.bg_White , styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5]}>
                                    <View style = {[ styles.Width_100, styles.rowGroup ]}>
                                        <View style = {[styles.flex_1 , styles.height_100, styles.marginHorizontal_5]}>
                                            <Image style = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/1.png')}/>
                                        </View>
                                        <View style = {[ styles.marginHorizontal_5]}>
                                            <TouchableOpacity onPress={() => this.incrementCount()} style={[ styles.bg_light_red, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5 ]}>
                                                <Icon type={'Entypo'} name={'plus'} style={[ styles.text_red, styles.textSize_14 ]}/>
                                            </TouchableOpacity>
                                            <View style={[styles.Border, styles.border_red, styles.paddingHorizontal_5, styles.paddingVertical_5]}>
                                                <Text style={[styles.text_red, styles.textRegular, styles.textSize_14, styles.textCenter]}>{this.state.count}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.decrementCount()} style={[ styles.bg_light_gray, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5 ]}>
                                                <Icon type={'Entypo'} name={'minus'} style={[ styles.text_White, styles.textSize_14 ]}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style = {[ styles.Width_100, styles.marginVertical_5, styles.paddingHorizontal_10 ]}>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>برجر لحم</Text>
                                        </View>
                                        <View style={[ ]}>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>برجر - لحم - سلطه</Text>
                                            <Text style = {[styles.textRegular, styles.text_red, styles.textSize_12, styles.border_right, styles.paddingHorizontal_10]}>10 ر.س</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={[ styles.bg_red, styles.width_40, styles.height_40, styles.flexCenter, styles.position_A, styles.bottom_10, styles.right_0 ]}>
                                        <Icon type={'AntDesign'} name={'close'} style={[ styles.text_White, styles.textSize_22 ]}/>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </View>

                        <View style={[ styles.Width_45, styles.marginHorizontal_5, styles.marginVertical_10 ]}>
                            <Animatable.View animation="fadeInLeft" easing="ease-out" delay={500} style={[ styles.Width_100, styles.position_R ]}>
                                <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                <View style = {[styles.position_R, styles.bg_White , styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5]}>
                                    <View style = {[ styles.Width_100, styles.rowGroup ]}>
                                        <View style = {[styles.flex_1 , styles.height_100, styles.marginHorizontal_5]}>
                                            <Image style = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/1.png')}/>
                                        </View>
                                        <View style = {[ styles.marginHorizontal_5]}>
                                            <TouchableOpacity onPress={() => this.incrementCount()} style={[ styles.bg_light_red, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5 ]}>
                                                <Icon type={'Entypo'} name={'plus'} style={[ styles.text_red, styles.textSize_14 ]}/>
                                            </TouchableOpacity>
                                            <View style={[styles.Border, styles.border_red, styles.paddingHorizontal_5, styles.paddingVertical_5]}>
                                                <Text style={[styles.text_red, styles.textRegular, styles.textSize_14, styles.textCenter]}>{this.state.count}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.decrementCount()} style={[ styles.bg_light_gray, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5 ]}>
                                                <Icon type={'Entypo'} name={'minus'} style={[ styles.text_White, styles.textSize_14 ]}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style = {[ styles.Width_100, styles.marginVertical_5, styles.paddingHorizontal_10 ]}>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>برجر لحم</Text>
                                        </View>
                                        <View style={[ ]}>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>برجر - لحم - سلطه</Text>
                                            <Text style = {[styles.textRegular, styles.text_red, styles.textSize_12, styles.border_right, styles.paddingHorizontal_10]}>10 ر.س</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={[ styles.bg_red, styles.width_40, styles.height_40, styles.flexCenter, styles.position_A, styles.bottom_10, styles.right_0 ]}>
                                        <Icon type={'AntDesign'} name={'close'} style={[ styles.text_White, styles.textSize_22 ]}/>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </View>

                        <View style={[ styles.Width_45, styles.marginHorizontal_5, styles.marginVertical_10 ]}>
                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.Width_100, styles.position_R ]}>
                                <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                <View style = {[styles.position_R, styles.bg_White , styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5]}>
                                    <View style = {[ styles.Width_100, styles.rowGroup ]}>
                                        <View style = {[styles.flex_1 , styles.height_100, styles.marginHorizontal_5]}>
                                            <Image style = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/1.png')}/>
                                        </View>
                                        <View style = {[ styles.marginHorizontal_5]}>
                                            <TouchableOpacity onPress={() => this.incrementCount()} style={[ styles.bg_light_red, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5 ]}>
                                                <Icon type={'Entypo'} name={'plus'} style={[ styles.text_red, styles.textSize_14 ]}/>
                                            </TouchableOpacity>
                                            <View style={[styles.Border, styles.border_red, styles.paddingHorizontal_5, styles.paddingVertical_5]}>
                                                <Text style={[styles.text_red, styles.textRegular, styles.textSize_14, styles.textCenter]}>{this.state.count}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.decrementCount()} style={[ styles.bg_light_gray, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5 ]}>
                                                <Icon type={'Entypo'} name={'minus'} style={[ styles.text_White, styles.textSize_14 ]}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style = {[ styles.Width_100, styles.marginVertical_5, styles.paddingHorizontal_10 ]}>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>برجر لحم</Text>
                                        </View>
                                        <View style={[ ]}>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>برجر - لحم - سلطه</Text>
                                            <Text style = {[styles.textRegular, styles.text_red, styles.textSize_12, styles.border_right, styles.paddingHorizontal_10]}>10 ر.س</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={[ styles.bg_red, styles.width_40, styles.height_40, styles.flexCenter, styles.position_A, styles.bottom_10, styles.right_0 ]}>
                                        <Icon type={'AntDesign'} name={'close'} style={[ styles.text_White, styles.textSize_22 ]}/>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </View>

                    </View>

                    <View style={[ styles.marginVertical_10, styles.paddingHorizontal_5, styles.marginHorizontal_15]}>

                        <View style={[styles.overHidden]}>
                            <TouchableOpacity onPress={() => this.toggleModalDelivery()} style={[ styles.marginVertical_5 , styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_White, styles.Border, (this.state.deliveryId !== null ? styles.border_red : styles.border_gray)]}>
                                <Text style={[styles.textBold, styles.textSize_13, (this.state.deliveryId !== null ? styles.text_red : styles.text_light_gray)]}>
                                    { this.state.delivery }
                                </Text>
                                <Icon style={[styles.textSize_14, styles.text_light_gray]} type="AntDesign" name='down' />
                            </TouchableOpacity>
                        </View>

                        <Modal isVisible={this.state.isModalDelivery} onBackdropPress={() => this.toggleModalDelivery()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                            <View style={[styles.overHidden, styles.bg_White, styles.Width_100, styles.position_R, styles.top_20]}>

                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                                    {
                                        this.props.deliveryTypes.map((type, i ) => {
                                            return(
                                                <TouchableOpacity
                                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                    onPress             = {() => this.selectDeliveryId(type.id, type.name)}
                                                >
                                                    <View style={[styles.overHidden, styles.rowRight]}>
                                                        <CheckBox
                                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                            color               = {styles.text_red}
                                                            selectedColor       = {styles.text_red}
                                                            checked             = {this.state.deliveryId === 1}
                                                        />
                                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                            {type.name}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                            </View>
                        </Modal>

                        <View style={[ styles.marginVertical_5 , styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray]}>
                            <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                { i18n.t('priceprod') }
                            </Text>
                            <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                {this.props.cartInfo.price} { i18n.t('RS') }
                            </Text>
                        </View>

                        <View style={[ styles.marginVertical_5 , styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray]}>
                            <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                { i18n.t('deliveryprice') }
                            </Text>
                            <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                {this.props.cartInfo.delivery_price} { i18n.t('RS') }
                            </Text>
                        </View>

                        <View style={[ styles.marginVertical_5 , styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_black, styles.Border, styles.border_gray]}>
                            <Text style={[styles.textBold, styles.textSize_13, styles.text_White]}>
                                { i18n.t('totalprice') }
                            </Text>
                            <Text style={[styles.textBold, styles.textSize_13, styles.text_White]}>
                                {this.props.cartInfo.total_price} { i18n.t('RS') }
                            </Text>
                        </View>

                        <TouchableOpacity
                            style       = {[ styles.marginVertical_25 , styles.width_150, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.flexCenter, styles.bg_red,]}
                            onPress     = {() => this.getLocation()}
                        >
                            <Text style={[styles.textRegular, styles.textSize_13, styles.text_White]}>
                                { i18n.t('sent') }
                            </Text>
                        </TouchableOpacity>

                    </View>

                </Content>

            </Container>

        );
    }
}

const mapStateToProps = ({ auth, profile, lang , cartInfo , deliveryTypes}) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang,
        cartInfo: cartInfo.cartInfo,
        deliveryTypes   : deliveryTypes.deliveryTypes,
    };
};
export default connect(mapStateToProps, {getCartInfo , getDeliveryTypes})(DetailsCart);
