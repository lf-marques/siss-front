import React, { useState } from 'react'
import { View, Text, FlatList, Alert} from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { ListItem, Button, Icon } from 'react-native-elements'
import PFAbstract from '../../services/pessoaFisica/Abstract'
import Contato from '../../services/contato/Index'

export default props => {

    const [usrData, setUsrData] = useState(null);

    function init(refresh = false) {
        if(!usrData || refresh) {
            PFAbstract.getByCurrentToken().then((response => {
                if(response['success']) {
                    setUsrData(response.data)
                }else if(response['error']){
                    Alert.alert(response.message)
                }
            }))
        }
    }

    function confirmContatoDeletion(contato) {
        Alert.alert('Excluir Contato', 'Deseja realmente excluir essa Contato?' + contato.name, [
            {
                text: 'Sim',
                onPress() {
                    Contato.deletar(contato.id).then((response => {
                        init(true)
                        Alert.alert(response);
                    }))
                }
            },
            {
                text: 'Não',
            },
        ])
}
    function getContatoItem({item:contato}){
        return (
            <ListItem bottomDivider onPress={() => props.navigation.navigate('ContatoForm',contato)}>
            <ListItem.Content>
                <ListItem.Title>{contato.nome}</ListItem.Title>
                <ListItem.Subtitle>{contato.parentesco}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
                onPress={() => {
                    props.navigation.navigate('ContatoForm', contato);
                }}
                type="clear"
                icon={<Icon name="edit" size={25} color="orange" />}
            />
            <Button
                onPress={() => { confirmContatoDeletion(contato) }}
                type="clear"
                icon={<Icon name="delete" size={25} color="red" />}
            />
        </ListItem>
        )
    }

    return (
        <View>
            {init()}
            <Button
                onPress={() => { init(true) }}
                type="reload"
                title="Atualizar"
            />
            <FlatList
                keyExtractor={contato => contato.id.toString()}
                data={usrData && usrData.contatos ? usrData.contatos : null}
                renderItem={getContatoItem}
            />
        </View>
    )
}