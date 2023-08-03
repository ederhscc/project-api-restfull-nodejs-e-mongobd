const router = require('express').Router();

const Person = require('../models/Person');

// CREATE - criação de dados no banco
router.post('/', async (req, res) => {

    const { name, salary, approved } = req.body;

    // Validação
    if (!name) {
        res.status(422).json({ error: 'o nome é obrigatório!' });
        return;

    } else if (!salary) {
        res.status(421).json({ error: 'o salário é obrigatório!' });
        return;
    }

    const person = {
        name,
        salary,
        approved
    }

    // Create
    try {
        // criando dados
        await Person.create(person);

        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' });

    } catch (error) {
        res.status(500).json({ error: "Falha ao tentar cadastrar os dados da pessoa!" });
    }
});

// READ - leitura de dados do banco
router.get('/', async (req, res) => {
    try {

        const people = await Person.find();

        res.status(200).json(people);

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// READ - leitura individualizado do registro
router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const person = await Person.findOne({ _id: id });

        if (!person) {
            res.status(422).json({ message: 'O usuário não foi encontrado!' });
            return;
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({ message: "Falha ao buscar o usuário!"});
    }

});

// Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person);

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'O usuário não foi encontrado!' });
        }

        res.status(200).json({message: "Dados da pessoa atualizado com sucesso!"});

    } catch (error) {
        res.status(500).send({ message: "Falha ao buscar os dados da pessoa!" });
    }
});

// DELETE - deletar dados do banco
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const person = await Person.findOne({ _id: id });

    if (!person) {
        res.status(422).json({ message: 'O usuário não foi encontrado!' });
        return;
    }

    try {
        await Person.deleteOne({ _id: id });

        res.status(200).json({ message: 'Usuário removido com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: "Falha ao excluir o usuário!"});
    }
});

module.exports = router;