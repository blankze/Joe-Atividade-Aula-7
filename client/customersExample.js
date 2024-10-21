const { getCustomers, addCustomer, updateCustomer, getCustomerById, deleteCustomer } = require('./customerService-client');

// Exemplo de uso

// 1. Buscar a lista de clientes pela primeira vez
console.log('1. Listando todos os clientes pela primeira vez:');
getCustomers();

// 2. Criar um novo cliente
console.log('2. Adicionando um novo cliente:');
addCustomer('John Doe', 'john@example.com');

// 3. Buscar a lista de clientes novamente, agora incluindo o novo cliente
setTimeout(() => {
    console.log('3. Listando todos os clientes pela segunda vez (após adicionar novo cliente):');
    getCustomers();
    
    // 4. Atualizar o cliente recém-adicionado (ajuste o ID conforme necessário)
    setTimeout(() => {
        console.log('4. Atualizando o cliente recém-adicionado com ID 1:');
        updateCustomer(1, 'John Updated', 'john.updated@example.com');
        
        // 5. Buscar o cliente atualizado por ID
        setTimeout(() => {
            console.log('5. Buscando o cliente atualizado pelo ID 1:');
            getCustomerById(1);

            // 6. Deletar o cliente recém-adicionado
            setTimeout(() => {
                console.log('6. Deletando o cliente com ID 1:');
                deleteCustomer(1);

                // 7. Buscar a lista de clientes após a exclusão
                setTimeout(() => {
                    console.log('7. Listando todos os clientes após deletar o cliente com ID 1:');
                    getCustomers();
                }, 1000); // Timeout para garantir que a exclusão foi processada
            }, 1000); // Timeout para garantir que a busca por ID foi processada
        }, 1000); // Timeout para garantir que a atualização foi processada
    }, 1000); // Timeout para garantir que a segunda listagem foi processada
}, 1000); // Timeout para garantir que a criação do cliente foi processada
