const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

// Carregar o arquivo proto
const PROTO_PATH = path.join(__dirname, '../customers.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})
const customersProto = grpc.loadPackageDefinition(packageDefinition)

// Conectar ao servidor
const client = new customersProto.CustomerService('localhost:50051', grpc.credentials.createInsecure())

// Função para obter clientes
const getCustomers = () => {
    client.GetCustomers({}, (error, response) => {
        if (error) {
            console.error(error);
            return
        }
        console.log('Clientes:', response.customers)
    });
};

// Função para adicionar um novo cliente
const addCustomer = (name, email) => {
    const newCustomer = { name, email }
    client.NewCustomer(newCustomer, (error, response) => {
        if (error) {
            console.error(error)
            return
        }
        console.log('Cliente adicionado:', response)
    });
};

// Função para atualizar um cliente existente
const updateCustomer = (id, name, email) => {
    const updateRequest = { id, name, email }
    client.UpdateUser(updateRequest, (error, response) => {
        if (error) {
            console.error(error)
            return;
        }
        console.log('Cliente atualizado:', response.message);
    });
};

// Função para obter cliente por ID
const getCustomerById = (id) => {
    client.GetUserById({ id }, (error, response) => {
        if (error) {
            console.error(error)
            return
        }
        console.log('Cliente encontrado:', response)
    });
};

// Função para deletar um cliente
const deleteCustomer = (id) => {
    client.DeleteUser({ id }, (error, response) => {
        if (error) {
            console.error(error)
            return
        }
        console.log('Cliente deletado:', response.message)
    });
};

module.exports = { getCustomers, addCustomer, updateCustomer, getCustomerById, deleteCustomer }

