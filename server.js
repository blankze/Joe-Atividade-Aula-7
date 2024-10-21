const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

// Carregar o arquivo proto
const PROTO_PATH = path.join(__dirname, 'customers.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})
const customersProto = grpc.loadPackageDefinition(packageDefinition).CustomerService

// Simulação de banco de dados
let customers = []
let nextId = 1

// Implementação dos métodos do serviço
const getCustomers = (call, callback) => {
    callback(null, { customers })
}

const newCustomer = (call, callback) => {
    const customer = {
        id: nextId++,
        name: call.request.name,
        email: call.request.email,
    };
    customers.push(customer)
    callback(null, customer)
};

// Implementação de UpdateUser (alterar cliente)
const updateUser = (call, callback) => {
    const { id, name, email } = call.request;
    const customer = customers.find(c => c.id === id);

    if (customer) {
        customer.name = name;
        customer.email = email;
        callback(null, { message: "Customer updated successfully!" });
    } else {
        callback(null, { message: "Customer not found!" });
    }
};

// Implementação de GetUserById (buscar cliente por ID)
const getUserById = (call, callback) => {
    const customer = customers.find(c => c.id === call.request.id);

    if (customer) {
        callback(null, customer);
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Customer not found!"
        });
    }
};

// Implementação de DeleteUser (deletar cliente)
const deleteUser = (call, callback) => {
    const index = customers.findIndex(c => c.id === call.request.id);

    if (index !== -1) {
        customers.splice(index, 1);
        callback(null, { message: "Customer deleted successfully!" });
    } else {
        callback(null, { message: "Customer not found!" });
    }
};

// Criação do servidor
function main() {
    const server = new grpc.Server();
    server.addService(customersProto.service, {
        GetCustomers: getCustomers,
        NewCustomer: newCustomer,
        UpdateUser: updateUser,      // Adiciona a função UpdateUser
        GetUserById: getUserById,    // Adiciona a função GetUserById
        DeleteUser: deleteUser,      // Adiciona a função DeleteUser
    })

    const PORT = '0.0.0.0:50051'
    server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Server is running on port ${PORT}`)
        server.start();  // Iniciar o servidor após binding
    })
}

main()
