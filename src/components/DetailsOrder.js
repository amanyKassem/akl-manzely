import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, FlatList,} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Icon,
    Body,
    Title, CheckBox, Form, Textarea,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";

class DetailsOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            isModalComment              : false,
            status                      : this.props.navigation.state.params.status,
            Error                       : '',
            massage                     : ''
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

    }

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.massage === '') {
            isError     = true;
            msg         = i18n.t('addcomm');
        }

        if (msg !== '') {
            this.setState({ Error : msg});
        }

        return isError;
    };

    toggleModalComment = () => {
        this.setState({ isModalComment  : !this.state.isModalComment});
    };

    sentComment(){

        const err = this.validate();

        if (!err){
            this.setState({ isModalComment  : !this.state.isModalComment});
            this.props.navigation.navigate('MyOrders');
        }

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

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Image style={[styles.headImage]} source={require('../../assets/img/left.png')} resizeMode={'contain'}/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_red, styles.textSize_16, styles.textLeft, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                            { i18n.t('orderDet') }
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
                                    <View style = {[ styles.Width_100]}>
                                        <View style = {[styles.height_100, styles.marginHorizontal_5]}>
                                            <Image style = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/1.png')}/>
                                        </View>
                                    </View>
                                    <View style = {[ styles.Width_100, styles.marginVertical_5, styles.paddingHorizontal_10 ]}>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>برجر لحم</Text>
                                        </View>
                                        <View style={[ ]}>
                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_10]}>برجر - لحم - سلطه</Text>
                                            <Text style = {[styles.textRegular, styles.text_red, styles.textSize_12, styles.border_right, styles.paddingHorizontal_10, styles.marginVertical_5]}>10 ر.س</Text>
                                        </View>
                                    </View>
                                    <View style={[ styles.Border, styles.border_red ,styles.flexCenter, styles.position_A, styles.bottom_10, styles.right_5, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                        <Text style={[ styles.text_red, styles.textRegular, styles.textSize_14]}>4</Text>
                                    </View>
                                </View>
                            </Animatable.View>
                        </View>

                        <View style={[ styles.Width_45, styles.marginHorizontal_5, styles.marginVertical_10 ]}>
                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.Width_100, styles.position_R ]}>
                                <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                <View style = {[styles.position_R, styles.bg_White , styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5]}>
                                    <View style = {[ styles.Width_100]}>
                                        <View style = {[styles.height_100, styles.marginHorizontal_5]}>
                                            <Image style = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/1.png')}/>
                                        </View>
                                    </View>
                                    <View style = {[ styles.Width_100, styles.marginVertical_5, styles.paddingHorizontal_10 ]}>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>برجر لحم</Text>
                                        </View>
                                        <View style={[ ]}>
                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_10]}>برجر - لحم - سلطه</Text>
                                            <Text style = {[styles.textRegular, styles.text_red, styles.textSize_12, styles.border_right, styles.paddingHorizontal_10, styles.marginVertical_5]}>10 ر.س</Text>
                                        </View>
                                    </View>
                                    <View style={[ styles.Border, styles.border_red ,styles.flexCenter, styles.position_A, styles.bottom_10, styles.right_5, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                        <Text style={[ styles.text_red, styles.textRegular, styles.textSize_14]}>4</Text>
                                    </View>
                                </View>
                            </Animatable.View>
                        </View>

                    </View>

                    <View style={[ styles.marginVertical_10, styles.paddingHorizontal_5, styles.marginHorizontal_15]}>

                       <View style={[ styles.position_R,  ]}>
                           <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                           <View style={[styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_10, styles.paddingVertical_10 ]}>

                               <View style={[ styles.marginVertical_5 , styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray]}>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                       { i18n.t('delver') }
                                   </Text>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                       توصيل من الشيف
                                   </Text>
                               </View>

                               <View style={[ styles.marginVertical_5 , styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray]}>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                       { i18n.t('tieat') }
                                   </Text>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                       5 ساعات
                                   </Text>
                               </View>

                               <View style={[ styles.marginVertical_5 , styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray]}>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                       { i18n.t('priceprod') }
                                   </Text>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                       20
                                   </Text>
                               </View>

                               <View style={[ styles.marginVertical_5 , styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray]}>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                       { i18n.t('deliveryprice') }
                                   </Text>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_black]}>
                                       60 ر.س
                                   </Text>
                               </View>

                               <View style={[ styles.marginVertical_5 , styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_black, styles.Border, styles.border_gray]}>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_White]}>
                                       { i18n.t('totalprice') }
                                   </Text>
                                   <Text style={[styles.textBold, styles.textSize_13, styles.text_White]}>
                                       80 ر.س
                                   </Text>
                               </View>

                           </View>
                       </View>

                        <View style={[ styles.position_R,styles.marginVertical_20 ]}>
                            <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                            <View style={[styles.bg_White, styles.borderRed, styles.paddingHorizontal_10, styles.paddingVertical_10 ]}>
                                <Text style={[ styles.textRegular, styles.text_black, styles.textSize_14 ]}>
                                    { i18n.t('orderStatus') }
                                </Text>
                                <Text style={[ styles.textRegular, styles.text_red, styles.textSize_14 ]}>
                                    لم يتم القبول بعد
                                </Text>
                            </View>
                        </View>

                        <View style= {[ styles.rowCenter ]}>
                            {
                                (this.state.status === 2) ?
                                    <TouchableOpacity
                                        style       = {[ styles.marginVertical_25 , styles.width_150, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.flexCenter, styles.bg_red,styles.marginHorizontal_5]}
                                        onPress     = {() => this.props.navigation.navigate('MyOrders')}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_13, styles.text_White]}>
                                            { i18n.t('payer') }
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <View/>
                            }
                            {
                                (this.state.status === 1) ?
                                    <TouchableOpacity
                                        style       = {[ styles.marginVertical_25 , styles.width_150, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.flexCenter, styles.bg_light_gray,styles.marginHorizontal_5]}
                                        onPress     = {() => this.toggleModalComment()}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_13, styles.text_White]}>
                                            { i18n.t('cancelOrder') }
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <View/>
                            }
                        </View>

                        <Modal isVisible={this.state.isModalComment} onBackdropPress={() => this.toggleModalComment()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

                                <View style={[styles.paddingVertical_15]}>
                                    <Text style={[styles.textBold, styles.text_black, styles.textSize_16, styles.textLeft , styles.SelfCenter]}>
                                        {i18n.t('cancelOrder')}
                                    </Text>
                                </View>

                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                                    <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                        <View style={[styles.rowGroup, styles.Width_100]}>
                                            <View style={[styles.position_R, styles.flex_1, styles.paddingHorizontal_10, styles.height_100]}>
                                                <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full ]} />
                                                <Textarea
                                                    placeholder         = {i18n.t('cancelOrderReason')}
                                                    onChangeText        = {(massage) => this.setState({massage})}
                                                    style               = {[styles.textArea, styles.height_100, styles.paddingVertical_10, styles.bg_White, styles.Border, styles.border_gray]}
                                                />
                                            </View>
                                        </View>

                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_red, styles.textCenter]}>{ this.state.Error }</Text>

                                        <TouchableOpacity
                                            style       = {[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40]}
                                            onPress     = {() => this.sentComment()}>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                                {i18n.translate('cancelOrder')}
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

export default DetailsOrder;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
