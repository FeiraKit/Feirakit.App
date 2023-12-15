import React, { useRef, useState } from 'react'
import {
  VStack,
  HStack,
  useTheme,
  Text,
  Button,
  Icon,
} from 'native-base'
import {
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
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
import * as yup from 'yup'
import { User } from '../services/user'
import { ControlledInput } from '../components/FormComponents/controlledInput'
import { InputLabel } from '../components/FormComponents/InputLabel'

export function MyAccount() {
  const userInstance = new User()
  const navigation = useNavigation()
  const user = useSelector((state) => state.AuthReducers.userData.userData)
  const cellRef = useRef(null)
  const [IsLoading, setIsLoading] = useState(false)
  const [isEdictionMode, setIsEdictionMode] = useState(false)
  const [cepInputFoccus, setCepInputFoccus] = useState(false)
  const [phoneInputFoccus, setPhoneInputFoccus] = useState(false)
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const userSchema = yup.object({
    nome: yup.string().required('informe o seu nome completo'),
    email: yup
      .string()
      .required('Informe um email válido')
      .email('Informe um email válido'),
    telefone: yup.string().min(10).required('Informe um numero de whatsapp'),
    cep: yup.string().min(7, 'CEP Inválido').required('Informe um CEP'),
    rua: yup.string().required('informe o nome da rua'),
    numero: yup.string().required('informe o numero da sua residência'),
    complemento: yup.string().required('adicione um complemento'),
    bairro: yup.string().required('informe o bairro'),
    cidade: yup.string().required('informe o nome da cidade'),
    estado: yup.string().required('selecione o estado'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
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
        onPress: () => {
          setIsLoading(true)
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
            telefone: cellRef?.current.getRawValue(),
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

  const deletTexts = {
    title: 'Excluir',
    description: 'Deseja realmente excluir a sua conta?',
    optionNo: 'Não',
    optionYes: 'Sim',
  }
  const deleteUser = () => {
    setDeleteIsLoading(true)
    Alert.alert(deletTexts.title, deletTexts.description, [
      {
        text: deletTexts.optionNo,
        onPress: () => {
          setDeleteIsLoading(false)
          return
        },
      },
      {
        text: deletTexts.optionYes,
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
          name='nome'
          iconName='person'
          error={errors.nome}
        />

        <ControlledInput
          control={control}
          name='email'
          iconName = 'email'
          error={errors.email}
        />

          <ControlledInput
            control={control}
            name='telefone'
            type={'cel-phone'}
            error={errors.telefone}
          />
           
        <InputLabel title='Endereço' />

          <ControlledInput
            control={control}
            name='cep'
            type={'custom'}
            error={errors.cep}
          />
          
          <ControlledInput
          control={control}
          name='rua'
          placeholder='Rua'
          error={errors.rua}
        />
        
        <ControlledInput
          control={control}
          name='numero'
          placeholder='Número'
          error={errors.numero}
        />

        <ControlledInput
          control={control}
          name='complemento'
          placeholder='Complemento'
        />

        <ControlledInput
          control={control}
          name='bairro'
          error={errors.bairro}
          placeholder='Bairro'
        />

        <ControlledInput
          control={control}
          name='cidade'
          error={errors.cidade}
          isDisabled
          placeholder='Cidade'
        />

        <ControlledInput
          control={control}
          isSelectState
          name='estado'
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
const styles = StyleSheet.create({
  userImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  txt: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 2,
  },
})
