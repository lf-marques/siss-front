import React, { useState } from 'react'
import { View, Text, FlatList ,Alert} from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import PFAbstract from '../../services/pessoaFisica/Abstract'
import Alergia from '../../services/condicaoClinica/alergias/Index'

export default props => {

    const [usrData, setUsrData] = useState(null);

    function init(refresh = false) {
        if(!usrData || refresh) {
            PFAbstract.getByCurrentToken().then((response => {
                if(response.success) {
                    setUsrData(response.data)
                }else if(response.error){
                    Alert.alert(response.message)
                }
            }))
        }
    }

    function confirmAlergiaDeletion(alergia) {
        Alert.alert('Excluir Alergia', 'Deseja realmente excluir essa Alergia?', [
            {
                text: 'Sim',
                onPress() {
                    Alergia.deletar(alergia.id).then((response => {
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
    function getAlergiaItem({item:alergia}){
        return (
            <ListItem>
            <ListItem.Content>
                <ListItem.Title>{alergia.tipo}</ListItem.Title>
                <ListItem.Subtitle>Atualizado em: {alergia.dataAtualizacao}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
                onPress={() => { confirmAlergiaDeletion(alergia) }}
                type="clear"
                icon={<Icon name="delete" size={25} color="red" />}
            />
        </ListItem>
        )
    }

    return (
        <View>
            {init()}
            <FlatList
                keyExtractor={alergia => alergia.id.toString()}
                data={usrData && usrData.condicaoClinica ? usrData.condicaoClinica.alergias : null}
                renderItem={getAlergiaItem}
            />
        </View>
    )
}