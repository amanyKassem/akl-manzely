import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import * as Animatable from 'react-native-animatable';

class TermsAddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                 : false,
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

    }

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('terms')}</Text>) ,
        drawerIcon      : (<Image style={[styles.headImage]} source={require('../../assets/img/locked.png')} resizeMode={'contain'}/>)
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
                            { i18n.t('termsAdd') }
                        </Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0, styles.zIndexDown ]}/>

                    <View style={[ styles.position_R, styles.zIndex, styles.bgFullWidth , styles.paddingVertical_10]}>
                        <View style={[ styles.position_R, styles.marginHorizontal_20, styles.bgFullWidth ]}>
                            <View style={[ styles.position_A, styles.shapeBlock, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white ]} />
                            <View style={[ styles.bg_White, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.Border, styles.border_gray, styles.bgFullWidth ]}>
                                <View style={[ styles.overHidden, styles.marginVertical_20 ]}>
                                    <Animatable.View animation="bounceIn" easing="ease-out" delay={500} style={[styles.flexCenter]}>
                                        <Image style={[styles.icoImage]} source={require('../../assets/img/icon.png')}/>
                                    </Animatable.View>
                                </View>
                                <View style={[styles.overHidden]}>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}>
                                        <Text style={[styles.textRegular , styles.text_red, styles.textCenter, styles.Width_100, styles.marginVertical_15, styles.textSize_16]}>
                                            { i18n.t('termsPro') }
                                        </Text>
                                        <Text style={[styles.textRegular , styles.text_black, styles.rowRight, styles.Width_100, styles.marginVertical_5]}>
                                            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                                        </Text>
                                    </Animatable.View>
                                </View>
                                <TouchableOpacity
                                    style={[styles.bg_red, styles.width_150, styles.flexCenter, styles.marginVertical_25, styles.height_40]}
                                    onPress = {()=> this.props.navigation.navigate('AddProduct')}>
                                    <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                        {i18n.translate('confirm')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                </Content>

            </Container>

        );
    }
}

export default TermsAddProduct;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
