import React, { Component } from "react";import {View, Text, Image, ActivityIndicator, TouchableOpacity} from "react-native";import {	Container,	Content,	Header,	Button,	Left,	Body,	Title, Item, Input,} from 'native-base'import styles from '../../assets/style';import i18n from "../../locale/i18n";import {connect} from "react-redux";import {getContactInfo} from "../actions";class SearchInput extends Component {	constructor(props){		super(props);		this.state = {			loader: true,			searchWord: null		}	}	componentWillMount() {		this.setState({loader: true});		this.props.getContactInfo(this.props.lang)	}	componentWillReceiveProps(nextProps, nextContext) {		this.setState({loader: false});	}	onSearch(){		this.props.navigation.navigate('FilterSearch', {			pageName 	: this.props.navigation.state.routeName,			keyword		: this.state.searchWord		});	}	render() {		return (			<View style={[styles.position_R, styles.SelfRight]}>				<Item floatingLabel style={styles.item}>					<Input						placeholder={i18n.translate('searchCat')}						style={[styles.input, styles.height_40, styles.BorderNone, styles.paddingRight_5, styles.paddingLeft_5 ,styles.textSize_14,styles.text_red, {backgroundColor : "#dcd8d8"}]}						autoCapitalize='none'						placeholderTextColor="#d8999a"						onChangeText={(searchWord) => this.setState({searchWord})}					/>				</Item>				<TouchableOpacity					style={[styles.position_A, styles.right_0, styles.width_50, styles.height_40, styles.flexCenter]}					onPress={() => this.onSearch()}>					<Image style={[styles.headImage]} source={require('../../assets/img/search.png')} resizeMode={'contain'}/>				</TouchableOpacity>			</View>		);	}}const mapStateToProps = ({ contactInfo, lang }) => {	return {		lang        : lang.lang,		contactInfo : contactInfo.contactInfo,		loader      : contactInfo.loader	};};export default connect(mapStateToProps, {getContactInfo})(SearchInput);