import React, {useContext} from 'react'
import { Alert, FlatList, View, Text } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import UsersContext from '../context/UsersContext'

export default props => {

    const {state ,dispatch} = useContext(UsersContext)

    function confirmUserDeletion(user) {
            Alert.alert('Excluir Usuário', 'Deseja realmente excluir o Usuário?' + user.name, [
                {
                    text: 'Sim',
                    onPress() {
                       dispatch({
                           type: 'deleteUser',
                           payload: user,
                       })
                    }
                },
                {
                    text: 'Não',
                },
            ])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem bottomDivider onPress={() => props.navigation.navigate('UserForm')}>
                <Avatar title={user.name} source={{ uri: user.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <Button
                    onPress={() => {
                        props.navigation.navigate('UserForm', user);
                    }}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />}
                />
                <Button
                    onPress={() => { confirmUserDeletion(user) }}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                />
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}