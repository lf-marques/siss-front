import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import PFAbstract from '../services/pessoaFisica/Abstract'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import Helper from '../services/Helper'

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
        let dataAtualizacao 
        if(condicaoClinica.dataAtualizacao) {
            dataAtualizacao = condicaoClinica.dataAtualizacao
        }else if(condicaoClinica.dataAlteracao) {
            dataAtualizacao = condicaoClinica.dataAlteracao
        }
        dataAtualizacao = Helper.formatDateAndRemoveTime(condicaoClinica.dataAlteracao)
        return (
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold'}}>{condicaoClinica.tipo}</ListItem.Title>
                    <ListItem.Subtitle style={{fontWeight: 'bold'}}>Atualizado em: {dataAtualizacao}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    function emptyData() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                <Text style={{ fontSize: 15 }}>
                    Nenhuma informa????o cadastrada.
                </Text>
            </View>
        )
    }

    function makeBody(info) {
        return (
            <Collapse>
                <CollapseHeader>
                    <View style={styles.separatorContainerExternal}>
                        <Text style={{fontSize: 20, color: '#FFF', fontWeight: 'bold'}}>{info.nome}</Text>
                        <Text style={styles.collapseText}>expandir</Text>
                    </View>
                </CollapseHeader>
                <CollapseBody>
                    <View>
                        <Collapse>
                            <CollapseHeader>
                                <View style={styles.separatorContainer}>
                                    <Text style={styles.separatorText}>INFORMA????ES PESSOAIS</Text>
                                    <Text style={styles.collapseText}>expandir</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View>
                                    <Text style={styles.containerLabelInfoPessoais} >
                                        <Text style={styles.labelBold}>Nome: </Text>
                                        {info.nome}
                                    </Text>
                                    <Text style={styles.containerLabelInfoPessoais}>
                                        <Text style={styles.labelBold}>CPF: </Text>
                                        {Helper.formatCpf(info.cpf)}
                                    </Text>
                                    <Text style={styles.containerLabelInfoPessoais}>
                                        <Text style={styles.labelBold}>RG: </Text>
                                        {Helper.formatRg(info.rg)}
                                    </Text>
                                    <Text style={styles.containerLabelInfoPessoais}>
                                        <Text style={styles.labelBold}>Tel.: </Text>
                                        {info.telefone}
                                    </Text>
                                    <Text style={styles.containerLabelInfoPessoais}>
                                        <Text style={styles.labelBold}>Cel.: </Text>
                                        {info.celular}
                                    </Text>
                                    <Text style={styles.containerLabelInfoPessoais}>
                                        <Text style={styles.labelBold}>Data Nasc.: </Text>
                                        {Helper.formatDateAndRemoveTime(info.dataNascimento)}
                                    </Text>
                                    <Text style={styles.containerLabelInfoPessoais}>
                                        <Text style={styles.labelBold}>Conv??nio M??dico:: </Text>
                                        {info.condicaoClinica.convenioMedico == 'NP' ? 
                                        'N??o possui' : info.condicaoClinica.convenioMedico}
                                    </Text>
                                    <Text style={styles.containerLabelInfoPessoais}>
                                        <Text style={styles.labelBold}>Tipo Sanguineo: </Text>
                                        {info.condicaoClinica.tipoSanguineo == 'NI' ? 
                                        'N??o soube informar' : info.condicaoClinica.tipoSanguineo}
                                    </Text>
                                </View>
                            </CollapseBody>
                        </Collapse>
                        <Collapse>
                            <CollapseHeader>
                                <View style={styles.separatorContainer}>
                                    <Text style={styles.separatorText}>VE??CULOS</Text>
                                    <Text style={styles.collapseText}>expandir</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    horizontal={true}
                                    keyExtractor={veiculo => veiculo.id.toString()}
                                    data={info && info.veiculos ? info.veiculos : null}
                                    renderItem={getVeiculoItem}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                    ListEmptyComponent={emptyData()}
                                />  
                            </CollapseBody>
                        </Collapse>
                        <Collapse>
                            <CollapseHeader>
                                <View style={styles.separatorContainer}>
                                    <Text style={styles.separatorText}>CONTATOS</Text>
                                    <Text style={styles.collapseText}>expandir</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    horizontal={true}
                                    keyExtractor={contato => contato.id.toString()}
                                    data={info && info.contatos ? info.contatos : null}
                                    renderItem={getContatoItem}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                    ListEmptyComponent={emptyData()}
                                />  
                            </CollapseBody>
                        </Collapse>
                        <Collapse>
                            <CollapseHeader>
                                <View style={styles.separatorContainer}>
                                    <Text style={styles.separatorText}>ALERGIAS</Text>
                                    <Text style={styles.collapseText}>expandir</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    horizontal={true}
                                    keyExtractor={alergia => alergia.id.toString()}
                                    data={info && info.condicaoClinica ? info.condicaoClinica.alergias : null}
                                    renderItem={getCondicaoClinicaItem}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                    ListEmptyComponent={emptyData()}
                                />
                            </CollapseBody>
                        </Collapse>
                        <Collapse>
                            <CollapseHeader>
                                <View style={styles.separatorContainer}>
                                    <Text style={styles.separatorText}>DOENCAS</Text>
                                    <Text style={styles.collapseText}>expandir</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    horizontal={true}
                                    keyExtractor={doenca => doenca.id.toString()}
                                    data={info && info.condicaoClinica ? info.condicaoClinica.doencas : null}
                                    renderItem={getCondicaoClinicaItem}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                    ListEmptyComponent={emptyData()}
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
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                        Nenhuma informa????o encontrada :(
                    </Text>
                </View>
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
                        Busca
                    </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    { data ? 'Encontramos o(s) seguinte(s) usu??rio(s):' : null }
                </Text>
            </View>
            <View>
                {getData()}  
            </View>
            <View style={{marginTop: 10, backgroundColor: '#AD0E3D'}}>
                <TouchableOpacity
                    onPress={() => { props.navigation.goBack() }}
                    type="back"
                    style={{alignItems: 'center'}}
                >
                    <Text style={{ fontSize: 18, color: '#FFF', fontWeight: 'bold', padding: 3}}>
                        Clique para realizar uma nova busca
                    </Text>
                </TouchableOpacity>
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
    separatorContainerExternal: {
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        backgroundColor: '#800026', 
        padding:3
    },
    separatorContainer: {
        backgroundColor: '#a30030',
        padding:6,
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
    separatorText: {
        fontSize: 13, 
        color: '#FFF', 
        fontWeight: 'bold'
    },
    collapseText: {
        fontSize: 13, 
        color: '#FFF', 
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right'
    },
    containerLabelInfoPessoais: {
        padding: 5,
        fontSize: 15 
    },
    labelBold: {
        fontWeight: 'bold'
    }
})