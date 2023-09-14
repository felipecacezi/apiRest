import { Request, Response } from "express"
import { Phrase } from '../models/Phrase'
import { Op } from "sequelize"

export const createPhrase = async (req: Request, res: Response) => {

    let { author, txt } = req.body

    try {
        const newPhrase = await Phrase.create({
            author, txt
        })

        res.status(201)
        .json({
            id: newPhrase.id,
            author,
            txt
        })
    } catch (error) {
        res.status(500)
        .json({
            message: 'Ocorreu um erro ao gravar a frase'
        })
    }
}

export const getPhrase = async (req: Request, res: Response) => {

    let { id } = req.params

    try {
        const phrase = await Phrase.findAll({
            where: {
                id
            }
        })

        res.status(200)
        .json({
            data: phrase ?? {}
        })
    } catch (error) {
        res.status(500)
        .json({
            message: 'Ocorreu um erro ao buscar a frase'
        })
    }
}

export const listPhrases = async (req: Request, res: Response) => {

    try {
        const phrases = await Phrase.findAll()

        res.status(200)
        .json({
            data: phrases
        })
    } catch (error) {
        res.status(500)
        .json({
            message: 'Ocorreu um erro ao buscar a lista de frases'
        })
    }
}

export const updatePhrase = async (req: Request, res: Response) => {

    let { id } = req.params
    let { author, txt } = req.body

    try {

        let phrase = await Phrase.findOne({
            where: {
                id: id
            }
        })

        if (!phrase) {
            res.status(400)
            .json({
                message: 'Atenção, frase não encontrada'
            })
            return
        }

        const update = await Phrase.update({
            author,
            txt
        }, {
            where : {
                id
            }
        })

        res.status(200)
        .json({
            id: update[0],
            author,
            txt
        })
    } catch (error) {
        res.status(500)
        .json({
            message: 'Ocorreu um erro ao alterar a frase'
        })
    }
}

export const deletePhrase = async (req: Request, res: Response) => {

    let { id } = req.params

    try {

        let phrase = await Phrase.findOne({
            where: {
                id: id
            }
        })

        if (!phrase) {
            res.status(400)
            .json({
                message: 'Atenção, frase não encontrada'
            })
        }

        await Phrase.destroy({
            where : {
                id
            }
        })

        res.status(200)
        .json({})
    } catch (error) {
        res.status(500)
        .json({
            message: 'Ocorreu um erro ao deletar a frase'
        })
    }
}