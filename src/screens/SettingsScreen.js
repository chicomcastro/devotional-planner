import React from 'react';
import { TextInput } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, SectionList, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions';
import colors from '../utils/colors';

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: [
                {
                    title: "Minha conta",
                    data: ["Login", "Nome", "Sobrenome", "Gênero", "Email"]
                },
                {
                    title: "Itens padrões",
                    data: [],
                },
            ],
        };
        this.dataTitleMap = {
            "Login": "username",
            "Nome": "firstName",
            "Sobrenome": "lastName",
            "Gênero": "gender",
            "Email": "mail",
        };
        this.textInput = "";
    };

    sendUpdate = (textInput, dataLabel) => {
        let updateValue = {};
        updateValue[dataLabel] = textInput;
        this.props.updateUser(updateValue);
    };

    Item = ({ title }) => {
        let dataLabel = this.dataTitleMap[title];
        let info = this.props.user[dataLabel];
        let textInput = info;
        // TODO encapsular componente para otimizar dispatches usando component state
        return (
            <View style={styles.item}>
                <Text style={styles.itemLabel}>{title}</Text>
                <View style={styles.textBox}>
                    <View style={styles.textBoxWrapper}>
                        <TextInput
                            placeholder=""
                            onChangeText={(textInput) => this.sendUpdate(textInput, dataLabel)}
                            value={textInput}
                            style={styles.textBoxInput}
                            blurOnSubmit={true}
                            onBlur={() => {
                                this.sendUpdate(textInput, dataLabel);
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <StatusBar backgroundColor={colors.white} barStyle='dark-content'></StatusBar>
                <SectionList
                    sections={this.state.settings}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <this.Item title={item} />}
                    renderSectionHeader={({ section: { title, icon } }) => (
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{title.toUpperCase()}</Text>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={{height: 2, marginLeft: 20}}></View>}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user, settings: state.settings };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: bindActionCreators(actions.updateUser, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SettingsScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: colors.background,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemLabel: {
        color: 'gray',
        fontSize: 14,
    },
    itemInfo: {
        fontSize: 14,
        width: 10,
        height: 10,
    },
    header: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    headerIcon: {
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 14,
        color: colors.essence2,
    },
    textBox: {
        // width: '70%',
    },
    textBoxWrapper: {
        // backgroundColor: 'black',
    },
});