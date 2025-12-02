// ...existing code...
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// Interface que define a forma de um funcionário (tipagem)
interface Funcionario {
    id: number;         // identificador único
    nome: string;       // nome do funcionário
    email: string;      // email do funcionário
    telefone: string;   // telefone de contato
    cargo: string;      // cargo/função
    status: string;     // status (ex: ativo/inativo)
}

export const FuncionariosTable: React.FC = () => {
    // estado que guarda a lista de funcionários (inicialmente vazia)
    const [funcionarios] = useState<Funcionario[]>([]);
    // estado que controla o indicador de carregamento (spinner)
    const [loading, setLoading] = useState(false);
    // controla se a modal de criar/editar está visível
    const [isModalVisible, setIsModalVisible] = useState(false);
    // armazena o id do funcionário que está sendo editado (ou null se novo)
    const [editingId, setEditingId] = useState<number | null>(null);
    // instância do formulário do Ant Design para manipular valores/validações
    const [form] = Form.useForm();

    // efeito que executa ao montar o componente — busca os funcionários
    useEffect(() => {
        fetchFuncionarios();
    }, []); // array vazio = executa uma vez ao montar

    // função assíncrona para buscar os funcionários da API
    const fetchFuncionarios = async () => {
        setLoading(true); // ativa o loading
        try {
            // chamada à API comentada — aqui você faria: const response = await api.get('/funcionarios');
            // depois atualizaria o estado: setFuncionarios(response.data);
        } catch (error) {
            // mostra mensagem de erro para o usuário
            message.error('Erro ao carregar funcionários');
        } finally {
            setLoading(false); // desativa o loading independentemente do resultado
        }
    };

    // definição das colunas da tabela (cada objeto representa uma coluna)
    const columns = [
        { title: 'Nome', dataIndex: 'nome', key: 'nome' },         // mostra a propriedade nome
        { title: 'Email', dataIndex: 'email', key: 'email' },      // mostra email
        { title: 'Telefone', dataIndex: 'telefone', key: 'telefone' }, // mostra telefone
        { title: 'Cargo', dataIndex: 'cargo', key: 'cargo' },      // mostra cargo
        { title: 'Status', dataIndex: 'status', key: 'status' },   // mostra status
        {
            title: 'Ações',
            key: 'acoes',
            // coluna com botões de ação; render recebe o registro da linha
            render: (_: any, record: Funcionario) => (
                <div>
                    {/* botão para editar: chama handleEdit com os dados do registro */}
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    {/* botão para deletar: chama handleDelete com o id do registro */}
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </div>
            ),
        },
    ];

    // quando clicar em editar: seta o id em edição, preenche o formulário e abre a modal
    const handleEdit = (funcionario: Funcionario) => {
        setEditingId(funcionario.id);
        form.setFieldsValue(funcionario); // preenche o form com os dados do funcionário
        setIsModalVisible(true);
    };

    // deleta um funcionário (chamada à API comentada)
    const handleDelete = async (_id: number) => {
        try {
            // await api.delete(`/funcionarios/${id}`); // chamada real à API
            message.success('Funcionário deletado com sucesso');
            fetchFuncionarios(); // recarrega a lista após deletar
        } catch (error) {
            message.error('Erro ao deletar funcionário');
        }
    };

    // salva (cria ou atualiza) um funcionário com base nos valores do formulário
    const handleSave = async (_values: Funcionario) => {
        try {
            // se editingId existe, seria um PUT para atualizar; caso contrário POST para criar
            // if (editingId) {
            //   await api.put(`/funcionarios/${editingId}`, values);
            // } else {
            //   await api.post('/funcionarios', values);
            // }
            message.success('Funcionário salvo com sucesso');
            setIsModalVisible(false); // fecha a modal
            form.resetFields();       // limpa o formulário
            fetchFuncionarios();      // recarrega lista atualizada
        } catch (error) {
            message.error('Erro ao salvar funcionário');
        }
    };

    // JSX retornado pelo componente
    return (
        <div>
            {/* botão para abrir modal de novo funcionário */}
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                Novo Funcionário
            </Button>

            {/* tabela que exibe a lista; rowKey="id" identifica cada linha unicamente */}
            <Table dataSource={funcionarios} columns={columns} loading={loading} rowKey="id" />

            {/* modal de criar/editar funcionário */}
            <Modal
                title={editingId ? 'Editar Funcionário' : 'Novo Funcionário'} // título dinâmico
                visible={isModalVisible} // controla visibilidade
                onOk={() => form.submit()} // botão OK submete o formulário
                onCancel={() => {
                    setIsModalVisible(false); // fecha modal
                    setEditingId(null);       // limpa id de edição
                    form.resetFields();       // reseta campos do form
                }}
            >
                {/* formulário AntD ligado à instância 'form' */}
                <Form form={form} onFinish={handleSave} layout="vertical">
                    {/* campo nome obrigatório */}
                    <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    {/* campo email obrigatório com validação de tipo 'email' */}
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>

                    {/* campo telefone (opcional) */}
                    <Form.Item name="telefone" label="Telefone">
                        <Input />
                    </Form.Item>

                    {/* campo cargo obrigatório */}
                    <Form.Item name="cargo" label="Cargo" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    {/* campo status com opções */}
                    <Form.Item name="status" label="Status">
                        <Select options={[{ label: 'Ativo', value: 'ativo' }, { label: 'Inativo', value: 'inativo' }]} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
