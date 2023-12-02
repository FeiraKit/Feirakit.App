import React, { useRef, useState } from 'react'
import {
  VStack,
  HStack,
  Select,
  useTheme,
  Text,
  Button,
  Input,
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
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import ViaCep from '../services/ViaCep'
import { useSelector, useDispatch } from 'react-redux'
import { Logout } from '../store/actions'
import { showMessage } from 'react-native-flash-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInputMask } from 'react-native-masked-text'
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

        <Controller
          control={control}
          name='nome'
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              height={54}
              alignSelf='center'
              w='94%'
              editable={isEdictionMode}
              borderWidth={isEdictionMode ? 1 : 0}
              bgColor={colors.gray[100]}
              color={errors.nome ? colors.purple[500] : colors.blue[900]}
              leftElement={
                <Icon
                  color={errors.nome ? colors.purple[500] : colors.blue[900]}
                  as={<MaterialIcons name='person' />}
                  size={6}
                  ml={2}
                />
              }
              placeholder='Nome Completo'
              fontFamily={'Montserrat_400Regular'}
              placeholderTextColor={
                errors.nome ? colors.purple[500] : colors.blue[900]
              }
              fontSize={14}
              borderRadius={8}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.nome && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.nome.message}
          </Text>
        )}

        <ControlledInput
          control={control}
          name='nome'
          iconName='person'
          error={errors.nome}
        />
        <ControlledInput
          control={control}
          name='nome'
          isMasked
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
        />

        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              editable={isEdictionMode}
              borderWidth={isEdictionMode ? 1 : 0}
              bgColor={colors.gray[100]}
              height={54}
              alignSelf='center'
              w='94%'
              keyboardType='email-address'
              color={errors.email ? colors.purple[500] : colors.blue[900]}
              leftElement={
                <Icon
                  color={errors.email ? colors.purple[500] : colors.blue[900]}
                  as={<MaterialIcons name='email' />}
                  size={6}
                  ml={2}
                />
              }
              placeholder='E-mail'
              fontFamily={'Montserrat_400Regular'}
              placeholderTextColor={
                errors.email ? colors.purple[500] : colors.blue[900]
              }
              fontSize={14}
              borderRadius={8}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.email.message}
          </Text>
        )}

        <HStack
          alignItems='center'
          mt={4}
          borderWidth={isEdictionMode ? 1 : 0}
          borderRadius={8}
          borderColor={phoneInputFoccus ? colors.blue[600] : colors.gray[250]}
          bgColor={colors.gray[100]}
          height={54}
          alignSelf='center'
          w='94%'
        >
          <Icon
            color={errors.telefone ? colors.purple[500] : colors.blue[900]}
            as={<FontAwesome5 name='whatsapp' />}
            size={5}
            ml={3}
          />
          <Controller
            control={control}
            name='telefone'
            render={({ field: { onChange, value } }) => (
              <TextInputMask
                type={'cel-phone'}
                onFocus={() => setPhoneInputFoccus(true)}
                onBlur={() => setPhoneInputFoccus(false)}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                color={errors.telefone ? colors.purple[500] : colors.blue[900]}
                placeholder='(xx) XXXXX-XXXX'
                style={{
                  fontFamily: 'Montserrat_400Regular',
                  fontSize: 14,
                  marginLeft: 11,
                }}
                width='70%'
                placeholderTextColor={
                  errors.telefone ? colors.purple[500] : colors.blue[900]
                }
                value={value}
                onChangeText={onChange}
                ref={cellRef}
                editable={isEdictionMode}
              />
            )}
          />
        </HStack>

        <InputLabel title='Endereço' />

        <HStack
          alignItems='center'
          mt={4}
          borderWidth={isEdictionMode ? 1 : 0}
          borderRadius={8}
          borderColor={cepInputFoccus ? colors.blue[600] : colors.gray[250]}
          bgColor={colors.gray[100]}
          height={54}
          alignSelf='center'
          w='94%'
        >
          <Controller
            control={control}
            name='cep'
            render={({ field: { onChange, value } }) => (
              <TextInputMask
                onFocus={() => setCepInputFoccus(true)}
                onBlur={() => setCepInputFoccus(false)}
                type={'custom'}
                options={{
                  mask: '99999-999',
                }}
                color={errors.cep ? colors.purple[500] : colors.blue[900]}
                placeholder='CEP'
                style={{
                  fontFamily: 'Montserrat_400Regular',
                  fontSize: 14,
                  marginLeft: 11,
                }}
                width='70%'
                placeholderTextColor={
                  errors.cep ? colors.purple[500] : colors.blue[800]
                }
                value={value}
                onChangeText={onChange}
                onEndEditing={() => {
                  getAddressData(value)
                }}
                keyboardType='numeric'
                editable={isEdictionMode}
              />
            )}
          />
        </HStack>
        {errors.cep && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.cep.message}
          </Text>
        )}

        <Controller
          control={control}
          name='rua'
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              bgColor={colors.gray[100]}
              color={colors.blue[900]}
              placeholder='* Rua'
              fontFamily={'Montserrat_400Regular'}
              placeholderTextColor={
                errors.rua ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
              value={value}
              onChangeText={onChange}
              editable={isEdictionMode}
              height={54}
              alignSelf='center'
              w='94%'
            />
          )}
        />
        {errors.rua && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.rua.message}
          </Text>
        )}

        <Controller
          control={control}
          name='numero'
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              bgColor={colors.gray[100]}
              color={colors.blue[900]}
              placeholder='* Numero'
              fontFamily={'Montserrat_400Regular'}
              placeholderTextColor={
                errors.numero ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
              keyboardType='default'
              value={value}
              onChangeText={onChange}
              editable={isEdictionMode}
              borderWidth={isEdictionMode ? 1 : 0}
              height={54}
              alignSelf='center'
              w='94%'
            />
          )}
        />
        {errors.numero && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.numero.message}
          </Text>
        )}

        <Controller
          control={control}
          name='complemento'
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              bgColor={colors.gray[100]}
              color={colors.blue[900]}
              placeholder='* Complemento'
              fontFamily={'Montserrat_400Regular'}
              placeholderTextColor={
                errors.numero ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
              keyboardType='default'
              value={value}
              onChangeText={onChange}
              editable={isEdictionMode}
              borderWidth={isEdictionMode ? 1 : 0}
              height={54}
              alignSelf='center'
              w='94%'
            />
          )}
        />

        <Controller
          control={control}
          name='bairro'
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              bgColor={colors.gray[100]}
              color={colors.blue[900]}
              placeholder='*Bairro'
              fontFamily={'Montserrat_400Regular'}
              placeholderTextColor={
                errors.bairro ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
              value={value}
              onChangeText={onChange}
              editable={isEdictionMode}
              borderWidth={isEdictionMode ? 1 : 0}
              height={54}
              alignSelf='center'
              w='94%'
            />
          )}
        />
        {errors.bairro && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.bairro.message}
          </Text>
        )}

        <Controller
          control={control}
          name='cidade'
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              bgColor={colors.gray[100]}
              color={colors.blue[900]}
              value={value}
              placeholder='*Cidade'
              fontFamily={'Montserrat_400Regular'}
              placeholderTextColor={
                errors.cidade ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
              onChangeText={onChange}
              editable={isEdictionMode}
              borderWidth={isEdictionMode ? 1 : 0}
              height={54}
              alignSelf='center'
              w='94%'
            />
          )}
        />
        {errors.cidade && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.cidade.message}
          </Text>
        )}

        <Controller
          control={control}
          name='estado'
          render={({ field: { onChange, value } }) => (
            <Select
              isDisabled={isEdictionMode ? false : true}
              borderWidth={isEdictionMode ? 1 : 0}
              mt={4}
              borderRadius={8}
              placeholderTextColor={
                errors.estado ? colors.purple[500] : colors.blue[800]
              }
              color={colors.blue[900]}
              selectedValue={value}
              placeholder='Selecione o estado'
              fontSize='md'
              accessibilityLabel='Escolha a categoria do produto'
              onValueChange={onChange}
              height={54}
              alignSelf='center'
              w='94%'
            >
              <Select.Item
                label='Acre'
                value='AC'
              />
              <Select.Item
                label='Alagoas'
                value='AL'
              />
              <Select.Item
                label='Amapá'
                value='AP'
              />
              <Select.Item
                label='Amazonas'
                value='AM'
              />
              <Select.Item
                label='Bahia'
                value='BA'
              />
              <Select.Item
                label='Ceará'
                value='CE'
              />
              <Select.Item
                label='Distrito Federal'
                value='DF'
              />
              <Select.Item
                label='Espírito Santo'
                value='ES'
              />
              <Select.Item
                label='Goiás'
                value='GO'
              />
              <Select.Item
                label='Maranhão'
                value='MA'
              />
              <Select.Item
                label='Mato Grosso'
                value='MT'
              />
              <Select.Item
                label='Mato Grosso do Sul'
                value='MS'
              />
              <Select.Item
                label='Minas Gerais'
                value='MG'
              />
              <Select.Item
                label='Pará'
                value='PA'
              />
              <Select.Item
                label='Paraíba'
                value='PB'
              />
              <Select.Item
                label='Paraná'
                value='PR'
              />
              <Select.Item
                label='Pernambuco'
                value='PE'
              />
              <Select.Item
                label='Piauí'
                value='PI'
              />
              <Select.Item
                label='Rio de Janeiro'
                value='RJ'
              />
              <Select.Item
                label='Rio Grande do Norte'
                value='RN'
              />
              <Select.Item
                label='Rio Grande do Sul'
                value='RS'
              />
              <Select.Item
                label='Rondônia'
                value='RO'
              />
              <Select.Item
                label='Roraima'
                value='RR'
              />
              <Select.Item
                label='Santa Catarina'
                value='SC'
              />
              <Select.Item
                label='São Paulo'
                value='SP'
              />
              <Select.Item
                label='Sergipe'
                value='SE'
              />
              <Select.Item
                label='Tocantins'
                value='TO'
              />
            </Select>
          )}
        />
        {errors.estado && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.estado.message}
          </Text>
        )}

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
