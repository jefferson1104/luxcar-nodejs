## ANÁLISE DE REQUISITOS
- Requisitos funcionais (RF)
- Requisitos não funcionais (RNF)
- Regra de negócio (RN)

### Cadastro de carro
**RF**
- Deve ser possível cadastrar um novo carro.
- Deve ser possivel listar todas as categorias.

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- O carrro deve ser cadastrado com status de disponivel por padrão.
- Somente usuário do tipo administrador pode fazer esse cadastro.

### Listagem de carro
**RF**
- Deve ser possível listar todos os carros com status de disponivel.
- Deve ser possivel listar todos os carros com status de disponivel pelo nome da categoria.
- Deve ser possivel listar todos os carros com status de disponivel pelo nome da marca.
- Deve ser possivel listar todos os carros com status de disponivel pelo nome do carro.

**RN**
- O usuário não precisa estar logado no sistema.

### Cadastro de especificação no carro
**RF**
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro.
- Somente usuário do tipo administrador pode fazer esse cadastro.

### Cadastro de imagens do carro
**RF**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros independente do status.

**RNF**
- Utilizar o multer para upload dos arquivos.

**RN**
- Deve ser possivel cadastrar mais de uma imagem para o mesmo carro.
- Somente usuário do tipo administrador pode fazer esse cadastro.

### Agendamento de alguem do caro
**RF**
- Deve ser possivel cadastrar um alugel.


**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possivel cadastrar um novo aluguel, caso já existe um aberto para o mesmo usuário.
- - Não deve ser possivel cadastrar um novo aluguel, caso já existe um aberto para o mesmo carro.