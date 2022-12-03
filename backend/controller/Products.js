import { response } from "express";
import Products from "../models/ProductsModel.js";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize"
export const getProducts = async(req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Products.findAll({
                attributes: ['uuid', 'name', 'price', 'stock'],
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Products.findAll({
                attributes: ['uuid', 'name', 'price', 'stock'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);


    } catch (error) {
        res.status(500).json({ msg: error.message });

    }

}

export const getProductById = async(req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({ msg: "Product not exist" });
        let response;
        if (req.role === "admin") {
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'price', 'stock'],
                where: {
                    id: product.id
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'price', 'stock'],
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);


    } catch (error) {
        res.status(500).json({ msg: error.message });

    }

}

export const createProduct = async(req, res) => {
    const { name, price, stock } = req.body;
    try {
        await Products.create({
            name: name,
            price: price,
            stock: stock,
            userId: req.userId
        });
        res.status(201).json({ msg: "Product created successfully" });
    } catch (error) {
        res.status(500)
            .json({ msg: error.message });
    }
}
export const updateProduct = async(req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({ msg: "Product not exist" });
        const { name, price, stock } = req.body;
        let response;
        if (req.role === "admin") {
            await Products.update({ name, price, stock }, {
                where: {
                    id: product.id
                }
            });
        } else {
            if (req.userId !== product.userId) return res.status(403).json({ msg: "Access denied" });
            await Products.update({ name, price, stock }, {
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Product updated successfully" });


    } catch (error) {
        res.status(500).json({ msg: error.message });

    }
}

export const deleteProduct = async(req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({ msg: "Product not exist" });
        const { name, price, stock } = req.body;
        let response;
        if (req.role === "admin") {
            await Products.destroy({
                where: {
                    id: product.id
                }
            });
        } else {
            if (req.userId !== product.userId) return res.status(403).json({ msg: "Access denied" });
            await Products.destroy({
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Product deleted successfully" });


    } catch (error) {
        res.status(500).json({ msg: error.message });

    }
}