import prisma from '../db'

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsTo: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => (
        [...allUpdates, ...product.updates]
    ), [])

    res.json({ data: updates })
}

export const getUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: update })
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.id
        }
    })

    if (!product) {
        // does not belong to signed in user
        return res.json({ message: 'Nope!' })
    }

    const update = await prisma.update.create({
        data: req.body
    })

    res.json({ data: update })
}

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const allProductUpdates = products.reduce((allUpdates, products) => ([...allUpdates, ...products.updates]), [])
    const matchedUpdate = allProductUpdates.find((update) => update.id === req.params.id)
    
    if (!matchedUpdate) {
        return res.json({ message: 'Nope' })
    }

    const deletedUpdate = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: deletedUpdate })
}

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updatedUpdates = products.reduce((allUpdates, products) => ([...allUpdates, ...products.updates]), [])
    const matchedUpdate = updatedUpdates.find((update) => update.id === req.params.id)
    
    if (!matchedUpdate) {
        return res.json({ message: 'Nope' })
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({ data: updatedUpdate })
}