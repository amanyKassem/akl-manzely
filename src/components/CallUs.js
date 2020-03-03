import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ActivityIndicator , Linking} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Form, Textarea,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {getContactInfo} from "../actions";
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import COLORS from "../consts/colors";
import Communications from 'react-native-communications';

class CallUs extends Component {
    constructor(props){
        super(props);
        this.state = {
            loader                     : true,
            Error                       : '',
            massage                     : ''
        }
    }

    componentWillMount() {
        this.setState({loader: true});
        this.props.getContactInfo(this.props.lang)
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

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.massage === '') {
            isError     = true;
            msg         = i18n.t('context');
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
        }

    }

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('contact')}</Text>) ,
            drawerIcon      : (<Image style={[styles.headImage]} source={require('../../assets/img/Contact-book.png')} resizeMode={'contain'}/>)
    });

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
                            { i18n.t('contact') }
                        </Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0, styles.zIndexDown ]}/>

                    <View style={[ styles.position_R, styles.zIndex, styles.bgFullWidth , styles.paddingVertical_10]}>
                        <View style={[ styles.position_R, styles.marginHorizontal_20, styles.bgFullWidth ]}>
                            <View style={[ styles.bg_White, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.Border, styles.border_gray, styles.bgFullWidth ]}>
                                <View style={[styles.marginVertical_20]}>

                                    <View style={[styles.overHidden]}>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.marginVertical_5, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.SelfLeft, styles.bg_White, styles.Border, styles.border_red , styles.Width_100 ]}>
                                            <Image style={[styles.favImage, styles.marginHorizontal_5]} source={require('../../assets/img/user_icon.png')} resizeMode={'contain'}/>
                                            <Text style={[ styles.textRegular, styles.textSize_14, styles.flexLeft, styles.text_black ]}>{this.props.contactInfo.name}</Text>
                                        </Animatable.View>
                                    </View>
                                    <TouchableOpacity style={[styles.overHidden]}  onPress={() => Communications.phonecall(this.props.contactInfo.phone, true)}>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.marginVertical_5, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.SelfLeft, styles.bg_White, styles.Border, styles.border_red , styles.Width_100 ]}>
                                            <Image style={[styles.favImage, styles.marginHorizontal_5]} source={require('../../assets/img/smartphone.png')} resizeMode={'contain'}/>
                                            <Text style={[ styles.textRegular, styles.textSize_14, styles.flexLeft , styles.text_black]}>{this.props.contactInfo.phone}</Text>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                    <View style={[styles.overHidden]}>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.marginVertical_5, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.SelfLeft, styles.bg_White, styles.Border, styles.border_red , styles.Width_100 ]}>
                                            <Image style={[styles.favImage, styles.marginHorizontal_5]} source={require('../../assets/img/map-location.png')} resizeMode={'contain'}/>
                                            <Text style={[ styles.textRegular, styles.textSize_14, styles.flexLeft , styles.text_black]}>{this.props.contactInfo.address}</Text>
                                        </Animatable.View>
                                    </View>

                                </View>
                                <TouchableOpacity
                                    style       = {[ styles.marginVertical_30 , styles.width_250, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.flexCenter,styles.marginHorizontal_5]}
                                    onPress     = {() => this.toggleModalComment()}
                                >
                                    <Text style={[styles.textRegular, styles.textSize_13, styles.text_red, styles.textDecoration]}>
                                        { i18n.t('FAsww') }
                                    </Text>
                                </TouchableOpacity>

                                <View style={[styles.rowCenter]}>
                                    <View style={[styles.overHidden]}>
                                        <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.marginVertical_5, styles.paddingHorizontal_10, styles.paddingVertical_10 ]}>
                                            <TouchableOpacity onPress={() => Linking.openURL(this.props.contactInfo.facebook)}>
                                                <Image style={[styles.iconBank]} source={require('../../assets/img/face.png')} resizeMode={'contain'}/>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>
                                    <View style={[styles.overHidden]}>
                                        <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.marginVertical_5, styles.paddingHorizontal_10, styles.paddingVertical_10  ]}>
                                            <TouchableOpacity onPress={() => Linking.openURL(this.props.contactInfo.twitter)}>
                                                <Image style={[styles.iconBank]} source={require('../../assets/img/twitter.png')} resizeMode={'contain'}/>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>
                                    <View style={[styles.overHidden]}>
                                        <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.marginVertical_5, styles.paddingHorizontal_10, styles.paddingVertical_10]}>
                                            <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone='+this.props.contactInfo.phone)}>
                                                <Image style={[styles.iconBank]} source={require('../../assets/img/wahts.png')} resizeMode={'contain'}/>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>
                                    <View style={[styles.overHidden]}>
                                        <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.marginVertical_5, styles.paddingHorizontal_10, styles.paddingVertical_10  ]}>
                                            <TouchableOpacity onPress={() => Linking.openURL(this.props.contactInfo.instagram)}>
                                                <Image style={[styles.iconBank]} source={require('../../assets/img/ins.png')} resizeMode={'contain'}/>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>

                    <Modal isVisible={this.state.isModalComment} onBackdropPress={() => this.toggleModalComment()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                        <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

                            <View style={[styles.paddingVertical_15]}>
                                <Text style={[styles.textBold, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                                    {i18n.t('FAsww')}
                                </Text>
                            </View>

                            <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                                <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                    <View style={[styles.rowGroup, styles.Width_100]}>
                                        <View style={[styles.position_R, styles.flex_1, styles.paddingHorizontal_10, styles.height_100]}>
                                            <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full ]} />
                                            <Textarea
                                                placeholder         = {i18n.t('textsent')}
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
                                            {i18n.translate('sent')}
                                        </Text>
                                    </TouchableOpacity>

                                </Form>

                            </View>

                        </View>
                    </Modal>


                </Content>

            </Container>

        );
    }
}

const mapStateToProps = ({ contactInfo, lang }) => {
    return {
        lang        : lang.lang,
        contactInfo : contactInfo.contactInfo,
        loader      : contactInfo.loader
    };
};
export default connect(mapStateToProps, {getContactInfo})(CallUs);
