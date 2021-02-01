import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView, TouchableOpacity, SectionList, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../utils/colors';

export default class SettingsScreen extends React.Component {
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
                    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
                },
            ],
        };
    };

    Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: colors.background,
        padding: 15,
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
    title: {
        fontSize: 14
    }
});