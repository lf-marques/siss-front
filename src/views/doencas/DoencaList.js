import React, { useState } from 'react'
import { View, Text, FlatList ,Alert} from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import PFAbstract from '../../services/pessoaFisica/Abstract'
import Doenca from '../../services/condicaoClinica/doencas/Index'
import Helper from '../../services/Helper'

export default props => {

    const [usrData, setUsrData] = useState(null);

    function init(refresh = false) {
        var goBack = props.route.params ? props.route.params.goBack : false
        
        if(!usrData || refresh || goBack) {
            PFAbstract.getByCurrentToken().then((response => {
                if(response['success']) {
                    let responseDoencas = response.data.condicaoClinica.doencas
                    let usrDoencas = usrData ? usrData.condicaoClinica.doencas : null

                    if(!goBack) {
                        setUsrData(response.data)
                    }else if(usrData && Helper.isObjsDiff(responseDoencas, usrDoencas)) {
                        setUsrData(response.data)
                    }
                }else if(response['error']){
                    Alert.alert(response.message)
                }
            }))
        }
    }

    function confirmDoencaDeletion(doenca) {
        Alert.alert('Excluir Doença', 'Deseja realmente excluir essa Doença?', [
            {
                text: 'Sim',
                onPress() {
                    Doenca.deletar(doenca.id).then((response => {
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
    
    function getDoencaItem({item:doenca}){
        if(doenca) {
            return (
                <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{doenca.tipo}</ListItem.Title>
                    <ListItem.Subtitle>Atualizado em: {doenca.dataAtualizacao}</ListItem.Subtitle>
                </ListItem.Content>
                <Button
                    onPress={() => { confirmDoencaDeletion(doenca) }}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                />
            </ListItem>
            )
        }
    }

    
    return (
        <View>
            {init()}
            <FlatList
                keyExtractor={doenca => doenca.id.toString()}
                data={usrData && usrData.condicaoClinica ? usrData.condicaoClinica.doencas : null}
                renderItem={getDoencaItem}
            />
        </View>
    )
}