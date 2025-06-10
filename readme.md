### Developed by:

Squad Vale
</br>
<i>Project encouraged by the Associação Fundo Social Vale do Jequitinhonha - FSVJ
</br>2022</i>

### Settings

#### Install Yarn package manager, case you don't already have it

Once you have npm installed you can run the following both to install and upgrade Yarn:

```shell
npm install --global yarn
```

#### Install project dependencies

Run this command in the project directory

```shell
yarn
```

#### Run the project

```shell
yarn start
```

#### Run the project on your own device

Install the app "Expo Go" in your device and scan the QR code you see in the terminal.

</br>
# FEIRA-KIT

## Visão Geral

O aplicativo FEIRA-KIT é um projeto social incentivado pelo Fundo Social Vale do Jequitinhonha, que tem por finalidade criar uma plataforma semelhante à uma feira livre virtual, onde os pequenos produtores rurais da região poderão cadastrar-se e publicar os ítens que produz e deseja vender, fazendo uma conexão direta com o cliente, para assim realizar as suas vendas.

## Principais tecnologias

- REACT NATIVE
- EXPO

## Teste o aplicativo

[Download -  Android](https://expo.dev/accounts/feirakitapp/projects/feirakit-app/builds/668e4fe8-8769-4415-9357-d566f985d99f)

## Repositórios de desenvolvimento

- [FRONT_END](https://github.com/Henrique0896/feirakit-frontend)
- [BACK_END](https://github.com/Henrique0896/feirakit-backend)

## SERVIÇOS DE HOSPEDAGEM

- Banco de dados -MongoDB Atlas
- API-[RENDER](https://feirakit-api.onrender.com)
- Upload de imagens -Firebase Storage



## LIBS FRONT-END

- EXPO "^49.0.0"
- REACT "18.0.0"

## FERRAMENTAS PARA A CRIAÇÃO DAS INTERFACES

O aplicativo usa a biblioteca [NativeBase](https://nativebase.io/) para a criação de uma interface do usuário consistente no Android e no iOS

## ESTRUTURA DE DIRETÓRIOS FRONT-END

### Dentro da pasta './src' temos a seguinte estrutura:

- assets
  - Imagens do projeto
- components
  - componentes base das interfaces
- routes
  - sistemas de roteamento do react-navigation
- screens
  - Telas do aplicativo
- services
  - configurações dos consumos de API,chamadas AXIOS
  - Criação de classes representando as entidades do banco de dados,configurando a comunicação via api-Axios
- store
  - Configuração do REDUX
  - Criação de Reducers e Actions
- styles
  - customização do tema padrão do projeto com native-base

### Na Raiz do projeto existe um arquivo chamado ".env" ,este arquivo é o responsável por armazenar todas as variáveis de ambiente do front-end. **Nunca deve ser compartilhado ou enviado para o Github**
