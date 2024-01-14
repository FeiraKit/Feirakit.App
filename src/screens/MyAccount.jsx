import React, { useState } from 'react'
import { VStack, HStack, useTheme, Text, Button, Icon } from 'native-base'
import { Alert, Image, TouchableOpacity, ScrollView } from 'react-native'
import { ButtonBack } from '../components/ButtonBack'
import { LogoFeira } from '../components/LogoFeira'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import ViaCep from '../services/ViaCep'
import { useSelector, useDispatch } from 'react-redux'
import { Logout } from '../store/actions'
import { showMessage } from 'react-native-flash-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '../services/user'
import { ControlledInput } from '../components/FormComponents/controlledInput'
import { InputLabel } from '../components/FormComponents/InputLabel'
import { EditUserSchema } from '../validationsSchemes/userValidations'
import { RFValue } from 'react-native-responsive-fontsize'
import { ControlledSelect } from '../components/FormComponents/ControlledSelect'
import { removeNumberMask } from '../utils/removeMasks'
import { styles } from './styles/MyAccountStyles'

export function MyAccount() {
  const userInstance = new User()
  const navigation = useNavigation()
  const user = useSelector((state) => state.AuthReducers.userData.userData)
  const [IsLoading, setIsLoading] = useState(false)
  const [isEdictionMode, setIsEdictionMode] = useState(false)
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)
  const { colors } = useTheme()

  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues: {
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      cep: user.endereco.cep,
      rua: user.endereco.rua,
      numero: user.endereco.numero,
      complemento: user.endereco.complemento,
      bairro: user.endereco.bairro,
      cidade: user.endereco.cidade,
      estado: user.endereco.estado,
    },
  })

  const editTexts = {
    title: 'Atualizar',
    description: 'Deseja realmente atualizar os seus dados?',
    optionNo: 'Não',
    optionYes: 'Sim',
  }

  const handleEditUser = (data) => {
    setIsLoading(true)
    setIsEdictionMode(false)
    Alert.alert(editTexts.title, editTexts.description, [
      {
        text: editTexts.optionNo,
        onPress: () => {
          setIsLoading(false)
          return
        },
      },
      {
        text: editTexts.optionYes,
        onPress: async () => {
          setIsLoading(true)
          let telefone = await removeNumberMask(data.telefone)
          let objUser = {
            email: data.email,
            nome: data.nome,
            senha: user.senha,
            endereco: {
              rua: data.rua,
              numero: data.numero,
              bairro: data.bairro,
              cep: data.cep,
              complemento: data.complemento,
              cidade: data.cidade,
              estado: data.estado,
            },
            telefone,
            id: user.id,
          }
          setIsLoading(false)
          userInstance
            .editUser(JSON.stringify(objUser))
            .then((response) => {
              showMessage({
                message: 'Dados alterados com sucesso',
                type: 'success',
              })
              logout(objUser.nome)
            })
            .catch((err) => {
              reset()
              showMessage({
                message: 'Erro ao realizar alterações',
                type: 'danger',
              })
              console.log(err)
              setIsLoading(false)
            })
        },
      },
    ])
  }

  const getAddressData = async (cep) => {
    await ViaCep.get(`${cep}/json/`)
      .then(({ data }) => {
        setValue('estado', data.uf)
        setValue('cidade', data.localidade)
        setValue('bairro', data.bairro)
        setValue('rua', data.logradouro)
      })
      .catch((err) => console.log(err))
  }

  const deleteTexts = {
    title: 'Excluir',
    description: 'Deseja realmente excluir a sua conta?',
    optionNo: 'Não',
    optionYes: 'Sim',
  }
  const deleteUser = () => {
    setDeleteIsLoading(true)
    Alert.alert(deleteTexts.title, deleteTexts.description, [
      {
        text: deleteTexts.optionNo,
        onPress: () => {
          setDeleteIsLoading(false)
          return
        },
      },
      {
        text: deleteTexts.optionYes,
        onPress: () => {
          let objUserId = { id: user.id }
          userInstance
            .deleteUser(objUserId)
            .then(() => {
              dispatch(Logout())
            })
            .catch((error) => {
              console.log(error.response.data)
              showMessage({
                message: 'Erro ao excluir a conta',
                type: 'danger',
              })
              setDeleteIsLoading(false)
            })
        },
      },
    ])
  }
  const changedUserText = {
    title: 'Dados Alterados',
    description:
      'os seus dados foram alterados com sucesso, por segurança será necessário realizar login novamente.',
    optionYes: 'ok',
  }

  const logout = (nome) => {
    Alert.alert(
      changedUserText.title,
      `Olá ${nome.split(' ')[0]}, ${changedUserText.description}`,
      [
        {
          text: changedUserText.optionYes,
          onPress: () => {
            dispatch(Logout())
          },
        },
      ]
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: '100%' }}
      contentContainerStyle={{
        width: '100%',
        justifyContent: 'center',
        paddingBottom: 10,
      }}
    >
      <VStack
        flex={1}
        w='full'
      >
        <ButtonBack />
        <LogoFeira />
        <TouchableOpacity>
          <Image
            style={styles.userImage}
            source={require('../assets/user.png')}
          />
        </TouchableOpacity>
        <Text
          fontFamily={'Montserrat_400Regular'}
          mt={5}
          fontSize={25}
          alignSelf='center'
        >
          {user.nome}
        </Text>

        <HStack
          justifyContent='space-between'
          display={'flex'}
          w={'96%'}
          mt={6}
          mb={4}
        >
          <Text
            style={styles.txt}
            alignSelf='flex-start'
            ml={4}
            mt={2}
          >
            {isEdictionMode ? 'Editar dados' : 'Meus dados'}
          </Text>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                borderColor: isEdictionMode
                  ? colors.red[500]
                  : colors.blue[400],
              },
            ]}
            onPress={() => {
              if (isEdictionMode) {
                reset()
              }
              setIsEdictionMode(!isEdictionMode)
            }}
          >
            <Icon
              color={isEdictionMode ? colors.red[500] : colors.blue[900]}
              as={<MaterialIcons name={isEdictionMode ? 'close' : 'edit'} />}
              size={6}
            />
            <Text>{isEdictionMode ? 'cancelar' : 'editar'}</Text>
          </TouchableOpacity>
        </HStack>

        <ControlledInput
          control={control}
          editable={isEdictionMode}
          name='nome'
          iconName='person'
          placeholder='Nome Completo'
          error={errors.nome}
        />

        <ControlledInput
          control={control}
          editable={isEdictionMode}
          name='email'
          keyboardType='email-address'
          iconName='email'
          placeholder='E-mail'
          error={errors.email}
        />

        <ControlledInput
          isMasked
          control={control}
          name='telefone'
          error={errors.telefone}
          type={'cel-phone'}
          placeholder={'(00) 0000-0000'}
          iconName={'whatsapp'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          editable={isEdictionMode}
          keyboardType='numeric'
        />

        <InputLabel
          title='Endereço'
          mt={RFValue(1)}
        />

        <ControlledInput
          isMasked
          control={control}
          name='cep'
          type={'custom'}
          options={{
            mask: '99999-999',
          }}
          placeholder='CEP'
          editable={isEdictionMode}
          action={getAddressData}
          error={errors.cep}
          keyboardType='numeric'
        />

        <ControlledInput
          control={control}
          editable={isEdictionMode}
          name='rua'
          placeholder='Rua'
          error={errors.rua}
        />

        <ControlledInput
          control={control}
          editable={isEdictionMode}
          name='numero'
          placeholder='Número'
          error={errors.numero}
        />

        <ControlledInput
          control={control}
          editable={isEdictionMode}
          name='complemento'
          placeholder='Complemento'
          error={errors.complemento}
        />

        <ControlledInput
          control={control}
          editable={isEdictionMode}
          name='bairro'
          placeholder='Bairro'
          error={errors.bairro}
        />

        <ControlledInput
          control={control}
          editable={isEdictionMode}
          name='cidade'
          placeholder='Cidade'
          error={errors.cidade}
        />

        <ControlledSelect
          control={control}
          isSelectState
          name='estado'
          isDisabled={!isEdictionMode}
          isSelectionInput={true}
          error={errors.estado}
        />

        {isEdictionMode && (
          <Button
            bgColor={colors.blue[600]}
            _pressed={{ bgColor: colors.blue[700] }}
            width={334}
            height={54}
            mt={10}
            isLoading={IsLoading}
            w='90%'
            borderRadius={15}
            alignSelf='center'
            alignContent='center'
            alignItems='center'
            onPress={handleSubmit(handleEditUser)}
          >
            <Text
              style={styles.txt}
              color={colors.gray[200]}
            >
              Confirmar alterações
            </Text>
          </Button>
        )}

        <Button
          bgColor={colors.blue[700]}
          _pressed={{ bgColor: colors.blue[700] }}
          mt={4}
          borderRadius={15}
          alignContent='center'
          alignItems='center'
          onPress={() => navigation.navigate('ChangePassword')}
          height={54}
          alignSelf='center'
          w='90%'
        >
          <Text
            style={styles.txt}
            color={colors.gray[200]}
          >
            Alterar Senha
          </Text>
        </Button>
        <Button
          bgColor={colors.purple[500]}
          _pressed={{ bgColor: colors.purple[700] }}
          isLoading={deleteIsLoading}
          width={334}
          height={54}
          mt={4}
          margin={10}
          borderRadius={15}
          alignContent='center'
          alignItems='center'
          onPress={deleteUser}
          alignSelf='center'
          w='90%'
        >
          <Text
            style={styles.txt}
            color={colors.gray[200]}
          >
            Excluir Conta
          </Text>
        </Button>
      </VStack>
    </ScrollView>
  )
}
