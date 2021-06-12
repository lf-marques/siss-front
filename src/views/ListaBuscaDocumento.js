import React, { useState } from 'react'
import { Alert, FlatList, ScrollView } from 'react-native'
import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Character } from 'react-native'
import { Button, Input, Icon, ListItem } from 'react-native-elements'
import PFAbstract from '../services/pessoaFisica/Abstract'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';


export default props => {
    const [isMulti, setIsMulti] = useState(false)
    const [data, setData] = useState(null)
    const searchParams = props.route.params ? props.route.params.searchParams : {}

    function init() {
        if(!data) {
            PFAbstract.getBy(searchParams.key, searchParams.value).then((response) => {
                if(response['success']) {
                    if(!response.data['id']) {
                        setIsMulti(true)
                    }
                    setData(response.data)
                }
            })
        }
    }

    function getVeiculoItem({item:veiculo}){
        return (
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>Modelo: {veiculo.modelo}</ListItem.Title>
                    <ListItem.Subtitle>Placa: {veiculo.placa}</ListItem.Subtitle>
                    <ListItem.Subtitle>Renavam: {veiculo.renavam}</ListItem.Subtitle>
                    <ListItem.Subtitle>Cor: {veiculo.cor}</ListItem.Subtitle>
                    <ListItem.Subtitle>Fabricante: {veiculo.marca}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
    function getContatoItem({item:contato}){
        return (
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>Nome: {contato.nome}</ListItem.Title>
                    <ListItem.Subtitle>Parentesco: {contato.parentesco}</ListItem.Subtitle>
                    <ListItem.Subtitle>Tel.: {contato.telefone}</ListItem.Subtitle>
                    <ListItem.Subtitle>Cel.: {contato.celular}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
    function getCondicaoClinicaItem({item:condicaoClinica}){
        return (
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>Tipo: {condicaoClinica.tipo}</ListItem.Title>
                    <ListItem.Subtitle>Atualizado em: {condicaoClinica.dataAtualizacao}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    function makeBody(info) {
        return (
            <Collapse>
                <CollapseHeader>
                    <View style={{backgroundColor: '#0c1274', padding:3 }}>
                        <Text style={{fontSize: 20, color: '#FFF', fontWeight: 'bold'}}>{info.nome}</Text>
                    </View>
                </CollapseHeader>
                <CollapseBody>
                    <View>
                        <View style={styles.separatorContainer}>
                            <Text style={styles.separatorText}>INFORMAÇÕES PESSOAIS</Text>
                        </View>
                        <Text>Nome: {info.nome}</Text>
                        <Text>CPF: {info.cpf}</Text>
                        <Text>RG: {info.rg}</Text>
                        <Text>Tel.: {info.telefone}</Text>
                        <Text>Cel.: {info.celular}</Text>
                        <Text>Data Nasc.: {info.dataNascimento}</Text>
                        <Text>
                            Convênio Médico: 
                            {info.condicaoClinica.convenioMedico == 'NP' ? 
                            'Não possuí' : info.condicaoClinica.convenioMedico}
                        </Text>
                        <Text>Tipo Sanguineo: {info.condicaoClinica.tipoSanguineo}</Text>
                        <Collapse>
                            <CollapseHeader>
                                <View style={styles.separatorContainer}>
                                    <Text style={styles.separatorText}>VEÍCULOS</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    horizontal={true}
                                    keyExtractor={veiculo => veiculo.id.toString()}
                                    data={info && info.veiculos ? info.veiculos : null}
                                    renderItem={getVeiculoItem}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                />  
                            </CollapseBody>
                        </Collapse>
                        <Collapse>
                            <CollapseHeader>
                                <View style={styles.separatorContainer}>
                                    <Text style={styles.separatorText}>CONTATOS</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    horizontal={true}
                                    keyExtractor={contato => contato.id.toString()}
                                    data={info && info.contatos ? info.contatos : null}
                                    renderItem={getContatoItem}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                />  
                            </CollapseBody>
                        </Collapse>
                        <Collapse>
                            <CollapseHeader>
                                <View style={styles.separatorContainer}>
                                    <Text style={styles.separatorText}>ALERGIAS</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    horizontal={true}
                                    keyExtractor={alergia => alergia.id.toString()}
                                    data={info && info.condicaoClinica ? info.condicaoClinica.alergias : null}
                                    renderItem={getCondicaoClinicaItem}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                />
                            </CollapseBody>
                        </Collapse>
                        <Collapse>
                            <CollapseHeader>
                                <View style={styles.separatorContainer}>
                                    <Text style={styles.separatorText}>DOENCAS</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    horizontal={true}
                                    keyExtractor={doenca => doenca.id.toString()}
                                    data={info && info.condicaoClinica ? info.condicaoClinica.doencas : null}
                                    renderItem={getCondicaoClinicaItem}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                />
                            </CollapseBody>
                        </Collapse>
                    </View>
                </CollapseBody>
            </Collapse>
        )
    }

    function makeBodyList({item:info}) {
        return makeBody(info)
    }

    function getData() {
        if(data) {
            if(isMulti) {
                return (
                    <FlatList
                        keyExtractor={pf => pf.id.toString()}
                        data={data ? data : null}
                        renderItem={makeBodyList}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                )
            }else {
                return makeBody(data)
            }
        }else {
            return (
                <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                    Nenhuma informação encontrada :(
                </Text>
            )
        }
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            {init()}
            <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#AD0E3D',
                    borderBottomRightRadius: 20,
                }}>
                    <Text style={{ fontSize: 30, color: '#FFF', fontWeight: 'bold' }}>
                        Resultado:
                    </Text>
            </View>
            <View>
                {getData()}  
            </View>
            <View>
                <Button
                    onPress={() => { props.navigation.goBack() }}
                    type="back"
                    title="Clique para realizar uma nova busca"
                />
            </View>
        </KeyboardAvoidingView >
    )
}
const styles = StyleSheet.create({
    background:  {
        backgroundColor: '#FFF',
    },
    input: {
        color: '#222',
        fontSize: 17,
        backgroundColor: '#FFF',

    },
    views: {
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    containerLogo: {
        width: '100%',
        padding:20,
    },
    separatorContainer: {
        backgroundColor: '#333778',
        padding:3
    },
    separatorText: {
        fontSize: 15, 
        color: '#FFF', 
        fontWeight: 'bold'
    }
})