import React, { useState } from 'react'
import { View, Text, FlatList ,Alert} from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import PFAbstract from '../../services/pessoaFisica/Abstract'
import Veiculo from '../../services/veiculo/Index'
import Helper from '../../services/Helper'

export default props => {

    const [usrData, setUsrData] = useState(null);

    function init(refresh = false) {
        var goBack = props.route.params ? props.route.params.goBack : false
        
        if(!usrData || refresh || goBack) {
            PFAbstract.getByCurrentToken().then((response => {
                if(response['success']) {
                    let responseVeiculos = response.data.veiculos
                    let usrVeiculos = usrData ? usrData.veiculos : null

                    if(!goBack) {
                        setUsrData(response.data)
                    }else if(usrData && Helper.isObjsDiff(responseVeiculos, usrVeiculos)) {
                        setUsrData(response.data)
                    }
                }else if(response['error']){
                    Alert.alert(response.message)
                }
            }))
        }
    }

    function confirmVeiculoDeletion(veiculo) {
        Alert.alert('Excluir Veiculo', 'Deseja realmente excluir esse Veiculo?' + veiculo.marca + ' '+ veiculo.modelo, [
            {
                text: 'Sim',
                onPress() {
                    Veiculo.deletar(veiculo.id).then((response => {
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

    function getVeiculoItem({item:veiculo}){
        return (
            <ListItem bottomDivider onPress={() => props.navigation.navigate('VeiculoForm',veiculo)}>
            <ListItem.Content>
                <ListItem.Title>{veiculo.modelo}</ListItem.Title>
                <ListItem.Subtitle>{veiculo.placa}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
                onPress={() => {
                    props.navigation.navigate('VeiculoForm', veiculo);
                }}
                type="clear"
                icon={<Icon name="edit" size={25} color="orange" />}
            />
            <Button
                onPress={() => { confirmVeiculoDeletion(veiculo) }}
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
                keyExtractor={veiculo => veiculo.id.toString()}
                data={usrData && usrData.veiculos ? usrData.veiculos : null}
                renderItem={getVeiculoItem}
            />
        </View>
    )
}