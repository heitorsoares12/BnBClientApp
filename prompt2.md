### **Prompt de Melhorias para a Tela de Mapa (`MapScreen`)**

**Persona:** Você é um Desenvolvedor React Native Sênior, especialista em `react-native-maps` e em criar experiências de usuário interativas e fluidas.

---

### **Contexto do Projeto**

A aplicação possui uma tela de mapa (`MapScreen.tsx`) que atualmente exibe marcadores (`UserMarker.tsx`) para cada usuário obtido do `UsersContext`. O mapa utiliza um estilo customizado (`mapStyle.ts`), mas a interação é limitada e a performance pode ser um problema com um grande número de usuários.

**Objetivo:** Transformar a tela de mapa de uma simples exibição de pontos para uma ferramenta interativa e informativa, melhorando a usabilidade e a performance.

---

### **Tarefas de Melhoria Detalhadas**

#### **1. Interatividade dos Marcadores e Exibição de Detalhes**

*   **Racional:** Atualmente, os marcadores não são clicáveis. Para que o mapa seja útil, o usuário precisa ser capaz de tocar em um marcador para ver as informações daquele cliente. A exibição de um card na parte inferior da tela é uma abordagem mais moderna e limpa do que os `Callout` (pop-ups) padrão do mapa.

*   **Ação:**
    1.  **Estado para Usuário Selecionado:** Em `MapScreen.tsx`, crie um estado para armazenar o usuário atualmente selecionado: `const [selectedUser, setSelectedUser] = useState<User | null>(null);`.
    2.  **Tornar Marcador Clicável:** Modifique o `UserMarker.tsx` para aceitar uma função `onPress`. No `MapScreen`, passe a função `() => setSelectedUser(user)` para cada marcador.
    3.  **Estilo do Marcador Selecionado:** Altere o `UserMarker.tsx` para que, se ele for o usuário selecionado, seu estilo seja diferente (ex: maior, com uma borda de destaque).
    4.  **Criar Card de Detalhes:** Crie um novo componente, `src/features/map/components/UserDetailsCard.tsx`. Este componente receberá o `selectedUser` como propriedade e exibirá suas informações (foto, nome completo, e-mail e telefone) em um card flutuante na parte inferior da tela.
    5.  **Exibição Condicional:** Em `MapScreen.tsx`, renderize o `UserDetailsCard` apenas quando `selectedUser` não for nulo. Adicione um botão de "fechar" no card para setar `selectedUser` de volta para `null`.

#### **2. Agrupamento de Marcadores (Clustering)**

*   **Racional:** Com muitos usuários próximos, os marcadores se sobrepõem, tornando o mapa ilegível e lento. O agrupamento (clustering) combina marcadores próximos em um único cluster, que ao ser tocado ou ao receber mais zoom, se expande.

*   **Ação:**
    1.  **Instalar Biblioteca:** Adicione uma biblioteca de clustering. A `react-native-map-clustering` é uma excelente opção.
        ```bash
        npm install react-native-map-clustering
        ```
    2.  **Implementar Clustering:** Em `MapScreen.tsx`, importe o `Clustering` da biblioteca. Envolva o seu `MapView` com o componente `<Clustering>`.
    3.  **Mapear Marcadores:** Mapeie os usuários para os componentes `<Marker>` dentro do `<Clustering>`. A biblioteca cuidará da lógica de agrupamento automaticamente.
    4.  **Estilizar Clusters:** Forneça uma propriedade `renderCluster` para o componente `<Clustering>` para customizar a aparência dos clusters (ex: um círculo com o número de usuários dentro).

#### **3. Foco na Localização Atual do Usuário**

*   **Racional:** O mapa atualmente centraliza em uma localização fixa. A experiência do usuário seria muito melhor se o mapa iniciasse focado na localização real do dispositivo.

*   **Ação:**
    1.  **Permissões e Localização:** Utilize uma biblioteca como `@react-native-community/geolocation` para obter a localização do usuário. Lembre-se de configurar as permissões de localização nos arquivos `AndroidManifest.xml` (Android) e `Info.plist` (iOS).
    2.  **Estado para Região:** Armazene a região do mapa em um estado.
    3.  **Buscar Localização:** Em um `useEffect`, peça permissão e busque a localização do usuário. Uma vez obtida, atualize o estado da região do mapa para centralizar nas coordenadas do usuário.
    4.  **Botão "Minha Localização":** Adicione um botão flutuante no mapa (um FAB - Floating Action Button) que, ao ser tocado, anima o mapa de volta para a localização atual do usuário.

---

**Conclusão da Tarefa:** Após implementar estas melhorias, a tela de mapa será uma feature robusta, interativa e performática, oferecendo um valor significativo para o usuário final.