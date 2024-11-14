# Assistente de IA no WhatsApp com Gemini

<div align="center">
  <img src="./.github/icon.jpg" width="250" />
</div>

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Requisitos](#requisitos)
- [Passos para Execução](#passos-para-execução)
- [Comandos de Execução](#comandos-de-execução)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Configuração do Google Cloud Vertex AI](#configuração-do-google-cloud-vertex-ai)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Funcionalidades](#funcionalidades)
- [Dependências Principais](#dependências-principais)

---

## Descrição do Projeto

Este projeto utiliza a inteligência artificial do Gemini para criar um assistente virtual que interage com os usuários via WhatsApp. O bot foi desenvolvido para responder a três prompts específicos, proporcionando uma experiência personalizada para os usuários:

- **Vasco**: O bot oferece respostas e interações sobre o time de futebol Vasco, com informações históricas, estatísticas e curiosidades.
- **Pokémon**: O bot interage com os usuários sobre o universo Pokémon, compartilhando dados sobre os jogos, personagens e eventos.
- **Compra Rápida**: O bot apresenta algumas informações formais sobre a empresa, incluindo sua missão de otimizar o processo de checkout, reduzir o abandono de carrinhos e aumentar as taxas de conversão dos lojistas.

A integração entre WhatsApp e Gemini permite que o bot tenha uma comunicação natural e fluida com os usuários, atendendo suas dúvidas e necessidades de forma interativa.

## Requisitos

Antes de iniciar a execução, verifique se você possui os seguintes requisitos:

- Node.js (versão 20)
- NestJS CLI (`npm install -g @nestjs/cli`)
- Yarn ou npm para gerenciar pacotes
- Hospedagem em uma google cloud

## Passos para Execução

### 1. Clonar o Repositório

Clone o repositório do projeto no Google cloud:

```bash
git clone https://github.com/rafaelmasselli/technical-test-ai-chat
cd technical-test-ai-chat
```

### 2. Instalar dependências

[Use o gerenciador de pacotes de sua preferencia](https://luby.com.br/desenvolvimento/software/tutoriais/gerenciador-de-pacotes/)
Execute a instalação

```bash
npm install
```

### 3. Inicie o projeto

Siga os comandos de execução para iniciar o projeto de usa preferencia

- [Comandos de Execução](#comandos-de-execução)

## Comandos de Execução

1. **Desenvolvimento com o Módulo de IA da Compra Rápida**:
   Para iniciar o projeto no modo de desenvolvimento com o módulo de "compra rápida", execute o comando abaixo:

```bash
npm run dev:compra
```

2. **Desenvolvimento com o Módulo de IA do Pokemon**:

Para rodar o módulo Pokémon, utilize o seguinte comando:

```bash
 npm run dev:pokemon
```

3. **Desenvolvimento com o Módulo de IA do Vasco**:

Para rodar o módulo do vasco, utilize o seguinte comando:

```bash
 npm run start:dev
```

## Variáveis de Ambiente

Como o **Google Cloud Vertex AI**, e para a configuração do banco de dados local. Abaixo estão os detalhes das variáveis de ambiente utilizadas no projeto.

### Configuração do Google Cloud Vertex AI

A configuração do **Google Cloud Vertex AI** é armazenada no arquivo `vertexConfig`. Esta configuração define as informações de conexão com o Google Cloud, incluindo o ID do projeto, a localização do serviço e os modelos de IA utilizados. O conteúdo deste arquivo é o seguinte:

```typescript
export const vertexConfig = {
  project: "xxxxxxxxx", // ID do projeto no Google Cloud
  location: "xxxxxxxxx", // Localização do serviço Vertex AI
  textModel: "xxxxxxxxx", // Modelo de IA para processamento de texto
  visionModel: "xxxxxxxxx", // Modelo de IA para visão computacional
};
```

## Estrutura de Pastas

```bash
├── dist/
├── jest-e2e.json
├── logs/
├── nest-cli.json
├── node_modules/
├── package.json
├── package-lock.json
├── src/
│   ├── app.module.ts
│   ├── common/
│   │   ├── config/
│   │   │   ├── public/
│   │   │   └── secret/
│   │   ├── interceptors/
│   │   └── interface/
│   ├── core/
│   │   ├── connection/
│   │   ├── database/
│   │   ├── logger/
│   │   └── useCases/
│   ├── main.ts
│   ├── modules/
│   └── test/
└── tsconfig.build.json
└── tsconfig.json
```

## Descrição das Pastas

### `/src/core`

A pasta `core` contém a estrutura principal da aplicação, organizada de forma a suportar funcionalidades centrais como conexão, banco de dados, e execução dos casos de uso.

- **`connection`**: Contém arquivos relacionados à conexão com bancos de dados ou outras fontes de dados.
- **`database`**: Scripts e arquivos responsáveis pela configuração e interação com o banco de dados.
- **`logger`**: Implementações e configurações relacionadas ao registro de logs da aplicação.
- **`useCases`**: Pasta que armazena os casos de uso da aplicação, cada um responsável por uma funcionalidade específica do sistema.

### `/src/common`

A pasta `common` armazena utilitários e configurações compartilhadas por toda a aplicação.

- **`config`**: Contém configurações de ambiente, como variáveis e configurações de serviços externos.
  - **`public`**: Configurações acessíveis publicamente, como prompts para interações do bot.
  - **`secret`**: Contém configurações sensíveis, como chaves de API e credenciais, garantindo que elas não sejam expostas no código público.
- **`interceptors`**: Scripts de interceptação para modificar ou manipular requisições/respostas.
- **`interface`**: Armazena interfaces TypeScript utilizadas em toda a aplicação.

### `/src/modules`

A pasta `modules` contém módulos específicos da aplicação, como funcionalidades de integração com APIs externas, ou serviços internos.

### `/src/test`

A pasta `test` contém os testes unitários e de integração da aplicação. Ela organiza os testes de maneira a garantir que os componentes e serviços da aplicação funcionem conforme esperado.

Esse projeto tem como objetivo ser um sistema inteligente, onde os módulos de interação (compra rápida, Pokémon, e outros) podem ser configurados de maneira flexível, mantendo o foco no contexto de cada situação, e gerenciando a comunicação com a IA de forma eficiente e personalizada.

## Funcionalidades

### Transcrição de Áudio para Texto

O sistema permite que os usuários enviem mensagens de áudio, que são automaticamente convertidas para texto antes de serem processadas pela IA. Esse recurso facilita a interação e melhora a acessibilidade, permitindo que o usuário se comunique por voz e ainda assim receba respostas adequadas baseadas no conteúdo transcrito.

### Geração de Resposta em Áudio

Além de responder em texto, o sistema converte as respostas geradas pela IA em formato de áudio. Esse recurso é especialmente útil em cenários onde uma interação mais natural e verbal é desejada, permitindo ao usuário escutar a resposta diretamente em formato de áudio.

### Sistema de Prompt Personalizado

Cada módulo de interação é orientado por prompts específicos, ajustando o tom e foco da IA para diferentes temas e contextos de resposta:

- **Compra Rápida**: A IA responde de forma formal e técnica, com foco em explicações sobre o sistema de compras rápidas.
- **Pokemon**: A IA fornece informações e curiosidades do universo Pokémon, mantendo um tom informativo e restrito ao universo do jogo.
- **Vasco**: Focado no time de futebol Vasco, este módulo apresenta curiosidades e histórico do time, com filtros de segurança desativados para respostas mais amplas.

### Segurança e Filtragem de Conteúdo

A configuração de segurança é uma parte importante da integração com o Google Cloud Vertex AI, com filtros de segurança personalizados para cada módulo. A IA é configurada para filtrar conteúdos prejudiciais e indesejados, garantindo que a resposta gerada esteja dentro de um nível de segurança adequado para o contexto de uso. Cada módulo possui configurações específicas de filtragem:

- **Compra Rápida**: Configurada com as categorias **HARM_CATEGORY_HATE_SPEECH**, **HARM_CATEGORY_DANGEROUS_CONTENT** e **HARM_CATEGORY_HARASSMENT**, com o threshold configurado em **BLOCK_MEDIUM_AND_ABOVE**, garantindo que qualquer conteúdo prejudicial seja bloqueado de maneira rigorosa para preservar um ambiente formal e técnico.

- **Pokemon**: Configurada com as categorias **HARM_CATEGORY_HATE_SPEECH** e **HARM_CATEGORY_DANGEROUS_CONTENT**, com o threshold em **BLOCK_LOW_AND_ABOVE**, oferecendo um nível de segurança adequado, sem limitar demasiadamente a conversa sobre o universo Pokémon.

- **Vasco**: Este módulo está com o filtro de segurança **desativado** (OFF), permitindo respostas amplas e completas para engajar os usuários com mais liberdade ao discutir curiosidades e informações sobre o time Vasco.
### Armazenamento de Configurações

As configurações de segurança, prompts e informações da IA são armazenadas em arquivos de configuração, permitindo fácil acesso e modificação sem a necessidade de alterar o código-fonte diretamente.

- **VertexConfig**: Contém informações do projeto e as configurações dos modelos, como o `textModel` e `visionModel`.
- **Prompts de Sistema**: Estão organizados em módulos, permitindo que cada módulo tenha um comportamento distinto, dependendo da necessidade do usuário.

## Dependências Principais

- @google-cloud/vertexai: Integração com o Vertex AI para modelos de IA generativos.
- @nestjs/core: Framework principal para construção do projeto.
- node-fetch: Biblioteca para requisições HTTP no Node.js.
- winston: Logger para registro de logs no projeto.
