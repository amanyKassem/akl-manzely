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
    Toast,
    Item,
    Input,
    Title,
    CheckBox, Form
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import * as Animatable from 'react-native-animatable';

class Credit extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                 : false,
            active                  : 1,
            selectId                : 0
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

    }

    onActive ( id ){
        this.setState({spinner: true, active : id });
    }

    selectId(id) {
        this.setState({selectId : id,});
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
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('credit')}</Text>) ,
        drawerIcon      : (<Image style={[styles.headImage]} source={require('../../assets/img/credit.png')} resizeMode={'contain'}/>)
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
                            { i18n.t('credit') }
                        </Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0, styles.zIndexDown ]}/>

                    <View style={[ styles.position_R, styles.zIndex, styles.bgFullWidth , styles.paddingVertical_10]}>

                        <View style={[ styles.rowGroup, styles.overlay_white, styles.Width_95, styles.paddingHorizontal_5]}>
                            <TouchableOpacity
                                style           = {[ styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flex_1 , ( this.state.active === 1  ? styles.border_top : '' ) ]}
                                onPress         = {() => this.onActive(1)}
                            >
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.textCenter ,( this.state.active === 1 ? styles.text_red : styles.text_black )]}>
                                    { i18n.t('deservedAmount') }
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style           = {[ styles.paddingHorizontal_5, styles.paddingVertical_5, styles.flex_1 , ( this.state.active === 2  ? styles.border_top : '' ) ]}
                                onPress         = {() => this.onActive(2)}
                            >
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.textCenter , ( this.state.active === 2 ? styles.text_red : styles.text_black )]}>
                                    { i18n.t('bepaid') }
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {
                            (this.state.active === 1) ?
                                <View style={[ styles.Width_90, styles.flexCenter, styles.marginVertical_30 ]}>
                                    <View style={[ styles.marginVertical_10 ]}>
                                        <Text style={[ styles.textRegular, styles.textSize_14, styles.textCenter ,styles.text_red , styles.marginVertical_5]}>
                                            { i18n.t('deservedAmount') }
                                        </Text>
                                        <Text style={[ styles.textRegular, styles.textSize_14, styles.textCenter ,styles.text_red , {marginBottom:25}]}>
                                            500 { i18n.t('RS') }
                                        </Text>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                            <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                            <TouchableOpacity>
                                                <View style={[ styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_10, styles.paddingVertical_10 ]}>
                                                    <View style={[ styles.flex_100 ]}>
                                                        <View style={[ styles.rowRight]}>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.width_120]}>
                                                                { i18n.t('numorders') }
                                                            </Text>
                                                            <Text style={[styles.text_black_gray, styles.textSize_13]}>:</Text>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                                13
                                                            </Text>
                                                        </View>
                                                        <View style={[ styles.rowRight]}>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.width_120]}>
                                                                { i18n.t('deservedAmount') }
                                                            </Text>
                                                            <Text style={[styles.text_black_gray, styles.textSize_13]}>:</Text>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                                30 ر.س
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>
                                </View>
                                :
                                <View style={[ styles.Width_90, styles.flexCenter, styles.marginVertical_30 ]}>
                                    <View style={[ styles.marginVertical_10 ]}>
                                        <Text style={[ styles.textRegular, styles.textSize_14, styles.textCenter ,styles.text_red , styles.marginVertical_5]}>
                                            { i18n.t('bepaid') }
                                        </Text>
                                        <Text style={[ styles.textRegular, styles.textSize_14, styles.textCenter ,styles.text_red , {marginBottom:25}]}>
                                            500 { i18n.t('RS') }
                                        </Text>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100, styles.marginVertical_10 ]}>
                                            <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                            <TouchableOpacity onPress = {() => this.selectId(2)}>
                                                <View style={[ styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.position_R ]}>
                                                    <View style={[ styles.flex_100 ]}>
                                                        <View style={[ styles.rowRight]}>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.width_120]}>
                                                                { i18n.t('numorders') }
                                                            </Text>
                                                            <Text style={[styles.text_black_gray, styles.textSize_13]}>:</Text>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                                13
                                                            </Text>
                                                        </View>
                                                        <View style={[ styles.rowRight]}>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.width_120]}>
                                                                { i18n.t('orderType') }
                                                            </Text>
                                                            <Text style={[styles.text_black_gray, styles.textSize_13]}>:</Text>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                                دفع عموله
                                                            </Text>
                                                        </View>
                                                        <View style={[ styles.rowRight]}>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.width_120]}>
                                                                { i18n.t('bepaid') }
                                                            </Text>
                                                            <Text style={[styles.text_black_gray, styles.textSize_13]}>:</Text>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                                20 ر.س
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red, styles.position_A , styles.top_10, { left : '95%' }]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.selectId === 2}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100, styles.marginVertical_10 ]}>
                                            <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                                            <TouchableOpacity onPress = {() => this.selectId(3)}>
                                                <View style={[ styles.rowGroup, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.position_R ]}>
                                                    <View style={[ styles.flex_100 ]}>
                                                        <View style={[ styles.rowRight]}>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.width_120]}>
                                                                { i18n.t('numorders') }
                                                            </Text>
                                                            <Text style={[styles.text_black_gray, styles.textSize_13]}>:</Text>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                                13
                                                            </Text>
                                                        </View>
                                                        <View style={[ styles.rowRight]}>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.width_120]}>
                                                                { i18n.t('orderType') }
                                                            </Text>
                                                            <Text style={[styles.text_black_gray, styles.textSize_13]}>:</Text>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                                دفع عموله
                                                            </Text>
                                                        </View>
                                                        <View style={[ styles.rowRight]}>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.width_120]}>
                                                                { i18n.t('bepaid') }
                                                            </Text>
                                                            <Text style={[styles.text_black_gray, styles.textSize_13]}>:</Text>
                                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                                20 ر.س
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red, styles.position_A , styles.top_10, { left : '95%' }]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.selectId === 3}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                        <TouchableOpacity
                                            style={[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40]}
                                            onPress={() => this.onLoginPressed()}>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                                {i18n.translate('confirm')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }

                    </View>

                </Content>

            </Container>

        );
    }
}

export default Credit;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);