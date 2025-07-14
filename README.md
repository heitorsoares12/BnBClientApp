# BnbClientApp

## Descrição do Projeto
Este projeto é um aplicativo móvel desenvolvido em React Native, projetado para gerenciar e visualizar informações de clientes. Ele permite o cadastro de novos usuários e a visualização de todos os clientes em uma lista e em um mapa interativo. A aplicação foi desenvolvida como parte de um teste técnico, focando em boas práticas de desenvolvimento, organização de código e experiência do usuário.

## Tecnologias Utilizadas
- **React Native**: Framework para construção de aplicativos móveis nativos usando JavaScript/TypeScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **React Navigation**: Solução de navegação para aplicativos React Native.
- **React Hook Form**: Biblioteca para gerenciamento de formulários com validação.
- **Yup**: Construtor de esquemas para validação de dados.
- **React Native Maps**: Componente de mapa para React Native, integrando Google Maps.
- **React Native Map Clustering**: Biblioteca para agrupar marcadores no mapa, melhorando a performance e a visualização.
- **@react-native-community/geolocation**: API para obter a localização do dispositivo.
- **Axios**: Cliente HTTP para fazer requisições a APIs.
- **Styled Components**: Biblioteca para estilização de componentes React com CSS-in-JS.
- **UUID**: Para geração de identificadores únicos.

## Instalação e Execução

### Pré-requisitos
- Node.js (20.19.3)
- npm ou Yarn
- React Native CLI
- Android Studio (para desenvolvimento Android) ou Xcode (para desenvolvimento iOS)

### Passos para Instalação
1.  **Clone o repositório:**
    ```bash
    git clone <https://github.com/heitorsoares12/BnBClientApp.git>
    cd BnbClientApp
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    ```
3.  **Configuração para iOS (se aplicável):**
    ```bash
    cd ios
    pod install
    cd ..
    ```

### Execução do Aplicativo

#### Android
1.  **Inicie o Metro Bundler:**
    ```bash
    npm start
    # ou yarn start
    ```
2.  **Em outro terminal, execute o aplicativo no emulador/dispositivo:**
    ```bash
    npx react-native run-android
    ```

#### iOS
1.  **Inicie o Metro Bundler:**
    ```bash
    npm start
    # ou yarn start
    ```
2.  **Em outro terminal, execute o aplicativo no simulador/dispositivo:**
    ```bash
    npx react-native run-ios
    ```
    Ou abra o projeto no Xcode (`ios/BnbClientApp.xcworkspace`) e execute por lá.

## Funcionalidades
-   **Autenticação (Simulada):** Gerenciamento de estado de autenticação.
-   **Cadastro de Clientes:** Formulário para adicionar novos clientes com validação de dados (nome, telefone, e-mail).
-   **Listagem de Clientes:** Exibição de todos os clientes cadastrados em uma lista, com funcionalidade de busca.
-   **Mapa Interativo:** Visualização dos clientes em um mapa, utilizando:
    -   **Clustering:** Agrupamento de marcadores para melhor visualização em áreas com muitos clientes.
    -   **Detalhes do Cliente:** Ao tocar em um marcador, um card com informações detalhadas do cliente é exibido.
    -   **Localização Atual:** O mapa pode centralizar na localização atual do usuário (requer permissão).

## Estrutura de Pastas
O projeto segue uma estrutura modular e organizada para facilitar a manutenção e escalabilidade:

-   `src/assets`: Contém arquivos de mídia como imagens.
-   `src/components`: Componentes React Native reutilizáveis e genéricos (ex: `SearchBar`, `UserListItem`).
-   `src/contexts`: Contextos da aplicação para gerenciamento de estado global (ex: `AuthContext`, `UsersContext`).
-   `src/features`: Módulos de funcionalidades específicas, cada um contendo suas telas, componentes e lógica relacionados (ex: `auth`, `cadastro`, `home`, `map`).
-   `src/hooks`: Hooks personalizados para lógica reutilizável (ex: `useDebounce`).
-   `src/navigation`: Configuração da navegação da aplicação (Stack Navigators, Tab Navigators).
-   `src/services`: Módulos para interação com APIs e serviços externos (ex: `api.ts`, `UserService.ts`).
-   `src/styles`: Definições de estilos globais e temas (ex: `theme.ts`).
-   `src/tests`: Arquivos de testes unitários e de integração.
-   `src/types`: Definições de tipos TypeScript para a aplicação.
-   `src/utils`: Funções utilitárias diversas (ex: `filterUsers`).

## Possíveis Melhorias Futuras
-   **Persistência de Dados:** Implementar armazenamento local (AsyncStorage, Realm, SQLite) para persistir os dados dos clientes cadastrados, mesmo após o fechamento do aplicativo.
-   **Edição de Clientes:** Adicionar funcionalidade para editar as informações de um cliente existente.
-   **Exclusão de Clientes:** Implementar a opção de remover clientes da lista.
-   **Otimização de Performance do Mapa:** Para um número muito grande de marcadores, explorar otimizações adicionais no `react-native-maps` e `react-native-map-clustering`.
-   **Testes Abrangentes:** Expandir a cobertura de testes unitários e adicionar testes de integração e E2E (End-to-End).
-   **Internacionalização:** Suporte a múltiplos idiomas.
-   **Notificações:** Implementar notificações locais ou push para eventos relevantes.
-   **Animações:** Adicionar animações mais fluidas e personalizadas para uma melhor experiência do usuário.