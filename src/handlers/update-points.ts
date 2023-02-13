import prisma from '../db'

export const getUpdatePoints = async (req, res) => {
    const updatePoints = await prisma.updatePoint.findMany()

    res.json({ data: updatePoints })
}

export const getUpdatePoint = async (req, res) => {
    const updatePoint = await prisma.updatePoint.findFirst({
        where: {
            id: req.updatePoint.id
        }
    })

    res.json({ data: updatePoint })
}

export const createUpdatePoint = async (req, res) => {
    const newUpdatePoint = await prisma.updatePoint.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            update: req.update.id,
            updatedAt: new Date()
        }
    })

    res.json({ data: newUpdatePoint })
}

export const deleteUpdatePoint = async (req, res) => {
    const deletedUpdatePoint = await prisma.updatePoint.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: deletedUpdatePoint })
}

export const updateUpdatePoint = async (req, res) => {
    const updatedUpdatePoint = await prisma.updatePoint.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            description: req.body.description
        }
    })

    res.json({ data: updatedUpdatePoint })
}